import React from 'react';

const KhaltiPayment = ({ price, userId, onPaymentSuccess }) => {
  const handlePayment = () => {
    if (!price || !userId) {
      alert('Price and User ID are required.');
      return;
    }

    if (!window.KhaltiCheckout) {
      alert('Khalti SDK not loaded.');
      return;
    }

    const config = {
      publicKey: 'test_public_key_your_khalti_public_key_here', // Replace with your Khalti public key
      productIdentity: 'product-001', // Unique product identifier
      productName: 'Booking Payment',
      productUrl: window.location.href,
      eventHandler: {
        onSuccess: (payload) => {
          console.log('Payment Success:', payload);
          if (onPaymentSuccess) onPaymentSuccess(payload);
        },
        onError: (error) => {
          console.error('Payment Error:', error);
          alert('Payment failed or cancelled.');
        },
        onClose: () => {
          console.log('Payment widget closed.');
        },
      },
      paymentPreference: ['KHALTI', 'EBANKING', 'MOBILE_BANKING', 'CONNECT_IPS', 'SCT'],
    };

    const checkout = new window.KhaltiCheckout(config);
    checkout.show({ amount: price * 100 }); // Amount in paisa
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        backgroundColor: '#6f2ed6',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
      }}
    >
      Pay NPR {price} with Khalti
    </button>
  );
};

export default KhaltiPayment;
