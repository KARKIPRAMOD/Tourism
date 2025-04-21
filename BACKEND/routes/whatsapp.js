const router = require("express").Router();
const twilio = require("twilio");
require("dotenv").config();

// Load environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

// Validate Twilio credentials
let client = null;
let twilioEnabled = false;

// Initialize Twilio client only if valid credentials are present
if (accountSid && accountSid.startsWith("AC") && authToken) {
  try {
    client = twilio(accountSid, authToken);
    twilioEnabled = true;
    console.log("Twilio WhatsApp integration enabled successfully");
  } catch (error) {
    console.error("Failed to initialize Twilio client:", error.message);
  }
} else {
  console.warn(
    "Twilio WhatsApp integration disabled: Missing or invalid credentials"
  );
  console.warn('TWILIO_ACCOUNT_SID should start with "AC"');
  console.warn("Please update your .env file with valid Twilio credentials");
}

// Route to send WhatsApp messages
router.post("/send", async (req, res) => {
  try {
    // Check if Twilio is properly configured
    if (!twilioEnabled || !client) {
      return res.status(503).json({
        status: "error",
        message:
          "WhatsApp service is not configured. Please check server configuration.",
      });
    }

    const { to, message } = req.body;

    // Validate input
    if (!to || !message) {
      return res.status(400).json({
        status: "error",
        message: "Missing 'to' or 'message' field",
      });
    }

    // Format the phone number for WhatsApp
    const formattedNumber = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;

    // Send WhatsApp message using Twilio
    const response = await client.messages.create({
      from: twilioWhatsAppNumber,
      to: formattedNumber,
      body: message,
    });

    return res.status(200).json({
      status: "success",
      messageSid: response.sid,
      message: "WhatsApp message sent successfully",
    });
  } catch (error) {
    console.error("WhatsApp error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to send WhatsApp message",
    });
  }
});

// Endpoint to check Twilio status
router.get("/status", (req, res) => {
  res.json({
    enabled: twilioEnabled,
    configuredNumber: twilioWhatsAppNumber || "Not configured",
  });
});

module.exports = router;
