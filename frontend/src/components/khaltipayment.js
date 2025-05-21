// import React from 'react';

// const KhaltiPayment = ({ price, userId, onPaymentSuccess }) => {
//   const handlePayment = () => {
//     if (!price || !userId) {
//       alert('Price and User ID are required.');
//       return;
//     }

//     if (!window.KhaltiCheckout) {
//       alert('Khalti SDK not loaded.');
//       return;
//     }

//     const config = {
//       publicKey: 'test_public_key_your_khalti_public_key_here', // Replace with your Khalti public key
//       productIdentity: 'product-001', // Unique product identifier
//       productName: 'Booking Payment',
//       productUrl: window.location.href,
//       eventHandler: {
//         onSuccess: (payload) => {
//           console.log('Payment Success:', payload);
//           if (onPaymentSuccess) onPaymentSuccess(payload);
//         },
//         onError: (error) => {
//           console.error('Payment Error:', error);
//           alert('Payment failed or cancelled.');
//         },
//         onClose: () => {
//           console.log('Payment widget closed.');
//         },
//       },
//       paymentPreference: ['KHALTI', 'EBANKING', 'MOBILE_BANKING', 'CONNECT_IPS', 'SCT'],
//     };

//     const checkout = new window.KhaltiCheckout(config);
//     checkout.show({ amount: price * 100 }); // Amount in paisa
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       style={{
//         backgroundColor: '#6f2ed6',
//         color: '#fff',
//         padding: '10px 20px',
//         border: 'none',
//         borderRadius: '6px',
//         cursor: 'pointer',
//         fontWeight: 'bold',
//         fontSize: '1rem',
//       }}
//     >
//       Pay NPR {price} with Khalti
//     </button>
//   );
// };

// export default KhaltiPayment;


import React, { useState } from "react";
import axios from "axios";

const KhaltiPayment = ({
  price,              // price in NPR (number)
  productIdentity,    // unique string to identify the product (hotelId, tourId, etc)
  productName,        // string (e.g., "Hotel Booking", "Tour Guide Booking")
  onPaymentSuccess,   // callback(paymentVerificationResponse) called after payment verification success
  onPaymentFail,      // optional callback on failure
}) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (!price || !productIdentity || !productName) {
      alert("Missing payment info");
      return;
    }

    if (!window.KhaltiCheckout) {
      alert("Khalti SDK not loaded");
      return;
    }

    setLoading(true);

    const config = {
      publicKey: "test_public_key_your_khalti_public_key_here", // Replace with your Khalti public key
      productIdentity,
      productName,
      productUrl: window.location.href,
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
      eventHandler: {
        onSuccess: async (payload) => {
          console.log("Payment Success:", payload);

          try {
            // Verify payment on backend
            const response = await axios.post("http://localhost:8070/verify", {
              token: payload.token,
              amount: payload.amount,
            });

            if (response.data.success) {
              alert("Payment verified successfully!");
              if (onPaymentSuccess) onPaymentSuccess(response.data);
            } else {
              alert("Payment verification failed.");
              if (onPaymentFail) onPaymentFail(response.data);
            }
          } catch (error) {
            alert("Error verifying payment.");
            if (onPaymentFail) onPaymentFail(error);
          } finally {
            setLoading(false);
          }
        },
        onError: (error) => {
          console.error("Payment error:", error);
          alert("Payment failed or cancelled.");
          setLoading(false);
          if (onPaymentFail) onPaymentFail(error);
        },
        onClose: () => {
          console.log("Payment widget closed");
          setLoading(false);
        },
      },
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
