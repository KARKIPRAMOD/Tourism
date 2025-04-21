import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import whatsappIcon from '../img/whatsapp-icon.png'; // Create or download this icon

function WhatsAppContact({ tourGuidePhone, tourGuideName }) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState(null);
  const [serviceAvailable, setServiceAvailable] = useState(true);

  // Check WhatsApp service status when component mounts
  useEffect(() => {
    async function checkServiceStatus() {
      try {
        const response = await axios.get('http://localhost:8070/whatsapp/status');
        setServiceAvailable(response.data.enabled);
      } catch (error) {
        console.error("Error checking WhatsApp service status:", error);
        setServiceAvailable(false);
      }
    }
    
    checkServiceStatus();
  }, []);

  // Handle message change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Send WhatsApp message
  const sendWhatsAppMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setStatus({
        type: 'error',
        text: 'Please enter a message'
      });
      return;
    }

    try {
      setIsSending(true);
      setStatus(null);
      
      const response = await axios.post('http://localhost:8070/whatsapp/send', {
        to: tourGuidePhone,
        message: `Message for ${tourGuideName}: ${message}`
      });

      setIsSending(false);
      setMessage('');
      setShowForm(false);
      setStatus({
        type: 'success',
        text: 'Message sent successfully!'
      });
    } catch (error) {
      setIsSending(false);
      setStatus({
        type: 'error',
        text: error.response?.data?.message || 'Failed to send message. Please try again.'
      });
      console.error("WhatsApp sending error:", error);
    }
  };

  // Alternative contact method when WhatsApp service is not available
  const handleDirectContact = () => {
    const phoneNumber = tourGuidePhone.replace(/\D/g, ''); // Remove non-numeric characters
    window.location.href = `tel:${phoneNumber}`;
  };

  if (!serviceAvailable) {
    return (
      <div className="whatsapp-contact mt-3">
        <button 
          className="btn btn-outline-secondary d-flex align-items-center" 
          onClick={handleDirectContact}
        >
          <i className="fas fa-phone me-2"></i>
          Contact by Phone
        </button>
        <small className="text-muted mt-1">WhatsApp service unavailable</small>
      </div>
    );
  }

  return (
    <div className="whatsapp-contact mt-3">
      {!showForm ? (
        <button 
          className="btn btn-success d-flex align-items-center" 
          onClick={() => setShowForm(true)}
        >
          <img 
            // src={whatsappIcon} 
            alt="WhatsApp" 
            style={{ width: '20px', marginRight: '8px' }} 
          />
          Contact via WhatsApp
        </button>
      ) : (
        <div className="card p-3">
          <h5 className="card-title">Send WhatsApp Message</h5>
          <form onSubmit={sendWhatsAppMessage}>
            <div className="form-group">
              <label htmlFor="whatsappMessage">Message to {tourGuideName}</label>
              <textarea
                id="whatsappMessage"
                className="form-control"
                value={message}
                onChange={handleMessageChange}
                rows="3"
                placeholder="Enter your message here..."
                required
              ></textarea>
            </div>
            
            <div className="d-flex mt-3">
              <button 
                type="submit" 
                className="btn btn-success me-2" 
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
          
          {status && (
            <div className={`alert mt-3 ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
              {status.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WhatsAppContact;
