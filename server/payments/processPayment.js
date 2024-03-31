require("dotenv").config()
const exntendedError = require("../errors/ExtendedError");

const { PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

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
  // use the cart information passed from the front-end to calculate the purchase unit details

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
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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

module.exports = {captureOrder, createOrder}