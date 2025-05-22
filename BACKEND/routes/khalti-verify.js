const express = require("express");
const axios = require("axios");
const router = express.Router();

const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY || "test_secret_key_your_secret_here"; // Your Khalti secret key

router.post("/verify", async (req, res) => {
  const { token, amount } = req.body;

  if (!token || !amount) {
    return res.status(400).json({ success: false, message: "Missing token or amount" });
  }

  try {
    // Call Khalti verify API
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      { token, amount },
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if verification is successful
    if (response.data && response.data.idx) {
      // idx is payment id from Khalti, verification success
      return res.json({ success: true, message: "Payment verified", data: response.data });
    } else {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Khalti verification error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Verification error", error: error.message });
  }
});

module.exports = router;
