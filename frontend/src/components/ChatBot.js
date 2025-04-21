import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../style_sheets/ChatBot.module.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const history = useHistory();

  const botResponses = {
    welcome: [
      "Hello! Welcome to Travelo. How can I help you today?",
      "Hi there! I'm your Travelo assistant. What would you like to know?",
      "Welcome! How may I assist you with your travel plans?"
    ],
    hotels: [
      "We have a great selection of hotels! Would you like to see our available options?",
      "I can help you find the perfect hotel. Would you like to browse our listings?"
    ],
    tourGuides: [
      "Our professional tour guides are ready to help! Would you like to see available guides?",
      "We have experienced tour guides for all destinations. Shall I show you the list?"
    ],
    packages: [
      "We offer various tour packages. Would you like to see our options?",
      "I can help you find the perfect tour package for your needs. Want to take a look?"
    ],
    booking: [
      "I can help you with booking. Would you like to proceed with a reservation?",
      "Ready to book your trip? I can guide you through the process."
    ],
    help: [
      "I can help you with:\n- Hotel bookings\n- Tour guides\n- Tour packages\n- General information",
      "Need assistance? I can help with bookings, finding guides, or answering general questions."
    ]
  };

  const handleNavigation = (path) => {
    history.push(path);
    setIsOpen(false);
  };

  const processMessage = (message) => {
    setIsTyping(true);
    const lowerMsg = message.toLowerCase();

    setTimeout(() => {
      if (lowerMsg.includes('hotel')) {
        setMessages(prev => [...prev, 
          { text: botResponses.hotels[0], sender: 'bot' },
          { text: "Click here to view hotels", sender: 'bot', action: () => handleNavigation('/view/hotel') }
        ]);
      }
      else if (lowerMsg.includes('guide')) {
        setMessages(prev => [...prev,
          { text: botResponses.tourGuides[0], sender: 'bot' },
          { text: "Click here to view tour guides", sender: 'bot', action: () => handleNavigation('/add/tourguide') }
        ]);
      }
      else if (lowerMsg.includes('package')) {
        setMessages(prev => [...prev,
          { text: botResponses.packages[0], sender: 'bot' },
          { text: "Click here to view packages", sender: 'bot', action: () => handleNavigation('/view/cuspackage') }
        ]);
      }
      else if (lowerMsg.includes('book')) {
        setMessages(prev => [...prev,
          { text: botResponses.booking[0], sender: 'bot' },
          { text: "Click here to make a booking", sender: 'bot', action: () => handleNavigation('/customize/package') }
        ]);
      }
      else {
        setMessages(prev => [...prev, 
          { text: botResponses.help[0], sender: 'bot' }
        ]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    processMessage(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      processMessage('help');
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, messages]);

  return (
    <div className={styles.chatbot}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Yatra Path Assistant</h3>
            <button onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          <div className={styles.messagesList}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`${styles.message} ${styles[msg.sender]}`}
                onClick={msg.action}
                style={msg.action ? {cursor: 'pointer', color: '#0066cc'} : {}}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && <div className={styles.typing}>Typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <button 
        className={styles.chatButton} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fas fa-comments"></i>
      </button>
    </div>
  );
};

export default ChatBot;