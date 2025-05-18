import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "../style_sheets/ChatBot.module.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const history = useHistory();

  const botResponses = {
    welcome: [
      "Namaste! Welcome to Travelo, your guide to exploring Nepal’s wonders. How can I assist you today?",
      "Hi there! I'm your Travelo assistant, ready to help you discover Nepal's beautiful places. What would you like to know?",
      "Welcome! Let me help you plan your perfect trip around Nepal’s amazing destinations.",
    ],
    hotels: [
      "We have a great selection of hotels in Nepal! Would you like to see available options?",
      "I can help you find the perfect hotel in Nepal. Would you like to browse our listings?",
    ],
    tourGuides: [
      "Our professional tour guides are ready to help you explore Nepal! Want to see available guides?",
      "We have experienced guides for all Nepal destinations. Shall I show you the list?",
    ],
    packages: [
      "We offer various Nepal tour packages. Would you like to see our options?",
      "I can help you find the perfect Nepal tour package. Want to take a look?",
    ],
    booking: [
      "I can help you with booking your Nepal trip. Shall we proceed?",
      "Ready to book your Nepal adventure? I can guide you through it.",
    ],
    places: [
      "Nepal is full of stunning places! Here are some highlights:\n\n- Mount Everest Base Camp\n- Pokhara and Phewa Lake\n- Chitwan National Park\n- Lumbini (Birthplace of Buddha)\n- Kathmandu Durbar Square\n\nWould you like to explore any of these in detail?",
      "Nepal’s beautiful destinations include Everest, Pokhara, Chitwan, Lumbini, and more. Interested in learning about a specific place?",
    ],
    flights: [
      "Looking for flights to or within Nepal? I can help you with flight schedules and bookings.",
      "Tell me your preferred dates and destinations, and I will find the best flights for you.",
    ],
    transport: [
      "We offer transportation options like airport transfers, taxis, and car rentals. How can I assist you?",
      "Need transport info in Nepal? I can help with car rentals, taxis, or public transport options.",
    ],
    weather: [
      "To plan your trip well, check Nepal’s weather forecast for your destination. Would you like current weather updates?",
      "I can provide weather forecasts for major tourist spots in Nepal.",
    ],
    festivals: [
      "Nepal has many colorful festivals like Dashain, Tihar, and Holi. Interested in festival dates or cultural info?",
      "Want to know about Nepal’s cultural festivals and events? I can share details and timings.",
    ],
    emergency: [
      "In case of emergencies, here are some important numbers:\nPolice: 100\nAmbulance: 102\nFire: 101\nTourist Police: 1975\n\nStay safe!",
      "I can provide emergency contacts and safety tips for travelers in Nepal.",
    ],
    faq: [
      "Here are some frequently asked questions: visa info, currency exchange, safety tips, and more. What do you want to know?",
      "I can answer FAQs related to travel in Nepal. Please ask your question.",
    ],
    support: [
      "If you need further help, you can contact our support team anytime.",
      "Our support team is available 24/7 for all your travel needs. Would you like their contact info?",
    ],
    help: [
      "I can help you with:\n- Hotel bookings\n- Tour guides\n- Tour packages\n- Flights\n- Transportation\n- Weather\n- Festivals\n- Emergency info\n- FAQs\n- Support",
      "Need assistance? I can guide you with bookings, travel info, or any questions you have.",
    ],
    fallback: [
      "Sorry, I didn’t get that. Could you please rephrase?",
      "I’m not sure I understand. Could you try asking differently?",
    ],
  };

  const handleNavigation = (path) => {
    history.push(path);
    setIsOpen(false);
  };

  const processMessage = (message) => {
    setIsTyping(true);
    const lowerMsg = message.toLowerCase();

    setTimeout(() => {
      if (lowerMsg.includes("hotel")) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.hotels[0], sender: "bot" },
          {
            text: "Click here to view hotels",
            sender: "bot",
            action: () => handleNavigation("/view/hotel"),
          },
        ]);
      } else if (lowerMsg.includes("guide")) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.tourGuides[0], sender: "bot" },
          {
            text: "Click here to view tour guides",
            sender: "bot",
            action: () => handleNavigation("/add/tourguide"),
          },
        ]);
      } else if (lowerMsg.includes("package")) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.packages[0], sender: "bot" },
          {
            text: "Click here to view packages",
            sender: "bot",
            action: () => handleNavigation("/view/cuspackage"),
          },
        ]);
      } else if (lowerMsg.includes("book")) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.booking[0], sender: "bot" },
          {
            text: "Click here to make a booking",
            sender: "bot",
            action: () => handleNavigation("/customize/package"),
          },
        ]);
      } else if (
        lowerMsg.includes("place") ||
        lowerMsg.includes("visit") ||
        lowerMsg.includes("nepal") ||
        lowerMsg.includes("beautiful") ||
        lowerMsg.includes("tourist spot") ||
        lowerMsg.includes("destination")
      ) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.places[0], sender: "bot" },
        ]);
      } else if (lowerMsg.includes("flight")) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.flights[0], sender: "bot" },
          {
            text: "Click here to search flights",
            sender: "bot",
            action: () => handleNavigation("/view/flights"),
          },
        ]);
      } else if (
        lowerMsg.includes("transport") ||
        lowerMsg.includes("taxi") ||
        lowerMsg.includes("car rental") ||
        lowerMsg.includes("bus")
      ) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.transport[0], sender: "bot" },
          {
            text: "Click here to explore transport options",
            sender: "bot",
            action: () => handleNavigation("/view/transport"),
          },
        ]);
      } else if (lowerMsg.includes("weather")) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.weather[0], sender: "bot" },
        ]);
      } else if (
        lowerMsg.includes("festival") ||
        lowerMsg.includes("culture") ||
        lowerMsg.includes("event")
      ) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.festivals[0], sender: "bot" },
        ]);
      } else if (
        lowerMsg.includes("emergency") ||
        lowerMsg.includes("help") ||
        lowerMsg.includes("police") ||
        lowerMsg.includes("ambulance")
      ) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.emergency[0], sender: "bot" },
        ]);
      } else if (lowerMsg.includes("faq") || lowerMsg.includes("question")) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.faq[0], sender: "bot" },
        ]);
      } else if (
        lowerMsg.includes("support") ||
        lowerMsg.includes("contact") ||
        lowerMsg.includes("service")
      ) {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.support[0], sender: "bot" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: botResponses.fallback[0], sender: "bot" },
        ]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
    processMessage(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Start conversation with welcome message randomly
      const welcomeMsg =
        botResponses.welcome[
          Math.floor(Math.random() * botResponses.welcome.length)
        ];
      setMessages([{ text: welcomeMsg, sender: "bot" }]);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
                style={
                  msg.action ? { cursor: "pointer", color: "#0066cc" } : {}
                }
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
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <button
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        <i className="fas fa-comments"></i>
      </button>
    </div>
  );
};

export default ChatBot;
