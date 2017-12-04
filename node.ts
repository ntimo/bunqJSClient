const fs = require("fs");
import BunqJSClient from "./src/BunqJSClient";

const BunqClient = new BunqJSClient();

/**
 * A 16-byte encryption key
 * @see https://github.com/digitalbazaar/forge#pkcs5
 */
const ENCRYPTION_KEY = "3c7a4d431a846ed33a3bb1b1fa9b5c26";
const API_KEY =
    "0d873607f6f84f12bd05ecfe226e4e8717928d95fa730783836c12fe00fc964f";
const DEVICE_NAME = "Node Server Test";
const ENVIRONMENT = "SANDBOX"; // OR you can use PRODUCTION
const PERMITTED_IPS = []; // empty array if you're not sure

const setup = async () => {
    console.log("pre-run");
    await BunqClient.run(API_KEY, PERMITTED_IPS, ENVIRONMENT, ENCRYPTION_KEY);
    console.log("post-run");

    console.log("pre-install");
    await BunqClient.install();
    console.log("post-install");

    console.log("pre-device");
    await BunqClient.registerDevice(DEVICE_NAME);
    console.log("post-device");

    console.log("pre-session");
    await BunqClient.registerSession();
    console.log("post-session");

    const fileBuffer = fs.readFileSync(`${__dirname}/png.png`);
    const binary = fileBuffer.toString("latin1");

    // creates valid image
    fs.writeFileSync(`${__dirname}/pngwrite.png`, binary, "binary");

    try {
        await BunqClient.api.attachmentPublic.post(binary);
    } catch (error) {
        setTimeout(() => {
            console.log("error3");
            console.log(error.response.data);
            console.log(error.response.headers);
        }, 2000);
    }
};

setup()
    .then(console.log)
    .catch(console.error);
