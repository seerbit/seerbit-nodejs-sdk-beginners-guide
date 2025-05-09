// 1. Load env vars
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Client, Config, StandardCheckout } = require("seerbit-nodejs");

const { PUBLIC_KEY, SECRET_KEY, BEARER_TOKEN } = require("./config");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

let seerbit;
try {
  const sdkConfig = new Config({
    publicKey: PUBLIC_KEY,
    secretKey: SECRET_KEY,
    bearerToken: BEARER_TOKEN,
  });
  seerbit = new Client(sdkConfig);
} catch (err) {
  console.error("⛔ SDK init failed:", err.message);
}

router.post("/standard-checkout", async (req, res, next) => {
  try {
    const checkout = new StandardCheckout(seerbit);
    const { fullName, amount, currency, country, email } = req.body;
    const payload = {
      fullName,
      amount,
      currency,
      country,
      email,
      paymentReference: Date.now().toString(),
      callbackUrl: "https://yourapp.com/callback",
    };
    const response = await checkout.Initialize(payload);
    return res.status(201).json({ response });
  } catch (error) {
    console.error("Checkout Error:", error);
    return next(error);
  }
});

app.get("/", (req, res) => res.send("Server is up and running"));

// 4. Mount router
app.use("/api", router);

// 5. Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// 6. Start server
app.listen(8000);
