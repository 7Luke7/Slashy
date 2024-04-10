require("dotenv").config()
const exntendedError = require("../errors/ExtendedError");
const { Affiliate } = require("../models/model");
const fs = require("fs")

const { PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_BASE_URL } = process.env;

const base = PAYPAL_BASE_URL

const generateAccessToken = async (next) => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
        throw new exntendedError("Error occured on server, try again.", 500)
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error(error)
    next(error)
  }
};

const createOrder = async (cost) => {
  try {
    const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: cost,
        },
      },
    ],
    "payment_source": {
      "paypal": {
        "experience_context": {
          "shipping_preference": "NO_SHIPPING",
        }
      }
    }
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      mode: 'cors',
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
  } catch (error) {
    console.log(error)
  }
};

const captureOrder = async (orderID) => {
  try {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }); 

    return handleResponse(response);
  } catch (error) {
    console.log(error)  
  } 
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

const withdraw_funds = async (req, res, next) => {
  try {
      const affiliate = await Affiliate.findById(req.session.affiliate)
      if (!affiliate) {
        throw new exntendedError("Affiliate wan't found, try again.", 400)
      } 

      if (Number(affiliate.amount) < Number(req.body.amount)) {
          throw new exntendedError("Please enter valid amount.", 400)
      }


      const accessToken = await generateAccessToken();
      const url = `${base}/v1/payments/payouts`;

      const batch_id = await fs.readFile("./batch_id.txt", "utf8", async (error, data) => {
        try {
          if (error) throw new exntendedError("Server Error occured while processing payment try again or contact us at info@slashy.shop.", 500)

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              "sender_batch_header": {
                "sender_batch_id": data,
                "email_subject": "You have a payout!",
                "email_message": "Thanks for Choosing us - Slashy!"
              },
              "items": [
                {
                  "recipient_type": req.body.option === "PHONE" ? "PHONE" : "EMAIL",
                  "amount": {
                    "value": req.body.amount,
                    "currency": "USD"
                  },
                  "note": "Thanks for your patronage!",
                  "sender_item_id": "201403140001",
                  "receiver": req.body.credential,
                }
              ]
            }),
          }); 
    
          fs.writeFileSync("./batch_id.txt", (Number(data) + 1).toString())
          if (!response.ok) { 
            throw new exntendedError("Something went wrong while withtdrawl please try again.", 500)
          } else {
            affiliate.amount = Number(affiliate.amount) - Number(req.body.amount)
            affiliate.save() 
            res.status(200).json({message: "Successfully withdrawed money."})
          }
        } catch (error) {
          next(error)
        }
      })
  } catch (error) {
      next(error)
  }
}

module.exports = {captureOrder, createOrder, withdraw_funds}