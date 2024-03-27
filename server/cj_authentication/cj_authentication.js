require("dotenv").config()
const fs = require("node:fs");

class CJClient {
    constructor() {
        this.accessToken = null;
        this.maxNetworkRetries = 3;
        this.accessTokenFile = './AccessToken.json';

        if (parseFloat(process.versions.node) < 14) {
            throw new Error("CJClient requires Node.js version 14 or higher.");
        }

        this.getAccessToken();
    }

    async getAccessToken() {
        try {
            const tokenData = JSON.parse(fs.readFileSync(this.accessTokenFile, 'utf8'));
            const expiryDate = new Date(tokenData.accessTokenExpiryDate);
            if (expiryDate > new Date()) {
                this.accessToken = tokenData.accessToken;
                return;
            }   
        } catch (err) {
            console.log(err)
        }
        await this.requestNewAccessToken();
    }

    async requestNewAccessToken() {
        try {
            const response = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: process.env.EMAIL,
                    password: process.env.PASSWORD
                })
            });

            const {code, data} = await response.json()
            if (code === 200 && data.accessToken) {
                this.accessToken = data.accessToken;
                fs.writeFileSync(this.accessTokenFile, JSON.stringify(data));
            } else {
                throw new Error(`Failed to authenticate with CJ API, error ${code}`);
            }
        } catch (error) {
            throw new Error(`Failed to get new access token: ${error.message}`);
        }
    }

    async createRequest(url, method, payload) {
        console.log(payload)
        if (!this.accessToken) {
            throw new Error('CJClient class not initialized');
        }

        const headers = {
            'CJ-Access-Token': this.accessToken,
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(payload)
            });

            const data = await response.json()

            if (data.code === 1600200) {
                const timeout = async () => setTimeout(() => {}, 1000)
                await timeout()
                return this.createRequest(url, method, payload);
            }
            return this.processResponse(data);
        } catch (error) {
            console.log(error)
            throw new Error(`CURL request failed after ${this.maxNetworkRetries} attempts: ${error.message}`, 500);
        }
    }

    processResponse(response) {
        if (response.code === 200) {
            return {
                status: 'success',
                message: response.message,
                data: response.data
            };
        } else {
            return {
                status: 'failed',
                message: response.message,
                code: response.code
            };
        }
    }
}

module.exports = CJClient;