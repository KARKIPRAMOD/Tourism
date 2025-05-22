import React, { useState, useEffect } from "react";
import axios from "axios";

const KhaltiPayment = ({
  price,               // Price in NPR (e.g. 1000)
  userId,              // For backend reference or logging
  productName = "Booking Payment",
  productIdentity ,
  onPaymentSuccess,
  onPaymentFail,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Khalti SDK once
    const script = document.createElement("script");
    script.src = "https://khalti.com/static/khalti-checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!price || !userId) {
      alert("Price and User ID are required.");
      return;
    }

    if (!window.KhaltiCheckout) {
      alert("Khalti SDK not loaded.");
      return;
    }

    setLoading(true);

    const config = {
      publicKey: "309083960f9c432eb583a3bc046ebc7c", 
      productIdentity,
      productName,
      productUrl: window.location.href,
      eventHandler: {
        async onSuccess(payload) {
          console.log("Payment Success:", payload);

          try {
            const response = await axios.post("http://localhost:8070/verify", {
              token: payload.token,
              amount: payload.amount,
              userId,
            });

            if (response.data.success) {
              alert("Payment verified successfully!");
              if (onPaymentSuccess) onPaymentSuccess(response.data);
            } else {
              alert("Payment verification failed.");
              if (onPaymentFail) onPaymentFail(response.data);
            }
          } catch (err) {
            alert("Error verifying payment.");
            console.error(err);
            if (onPaymentFail) onPaymentFail(err);
          } finally {
            setLoading(false);
          }
        },
        onError(error) {
          console.error("Payment Error:", error);
          alert("Payment failed or cancelled.");
          setLoading(false);
          if (onPaymentFail) onPaymentFail(error);
        },
        onClose() {
          console.log("Payment widget closed.");
          setLoading(false);
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
    };

    const checkout = new window.KhaltiCheckout(config);
    checkout.show({ amount: price * 100 }); // amount in paisa
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      style={{
        backgroundColor: loading ? "#aaa" : "#6f2ed6",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "6px",
        cursor: loading ? "not-allowed" : "pointer",
        fontWeight: "bold",
        fontSize: "1rem",
      }}
    >
      {loading ? "Processing..." : `Pay NPR ${price} with Khalti`}
    </button>
  );
};

export default KhaltiPayment;
