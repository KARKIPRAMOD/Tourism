import React, { useState, useEffect } from 'react';
import axios from 'axios';
import tourImage from '../img/tourupdates.jpg';

const TourUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What if I take permits before April 1st, 2023?",
      answer: "The new rule came into effect from April 1st, 2023. Trekkers who got permits and started their trek before April 1st do not require a guide, but they must have entered the trekking area before April 1st."
    },
    {
      id: 2,
      question: "What if I want to do ACT or similar treks in mountain bikes?",
      answer: "All treks need to comply with the new rule. You can contact a trekking agency in Nepal for a guide to accompany you on mountain bikes."
    },
    {
      id: 3,
      question: "What if I'm an experienced trekker with mountaineering association membership?",
      answer: "The rule is applicable for all foreign national trekkers, regardless of experience or association membership."
    },
    {
      id: 4,
      question: "Where are guides mandatory?",
      answer: "Guides are mandatory in all areas where TIMS is applicable and in national park areas in the mountains. This includes places like Chame and Muktinath. The rule is not applicable in Kathmandu Valley outskirts, Pokhara outskirts, and hiking areas around major cities."
    },
    {
      id: 5,
      question: "Do I have to go through a trekking agency?",
      answer: "Yes, it is mandatory to hire a licensed trekking guide through a government-registered trekking agency."
    },
    {
      id: 6,
      question: "How can I verify if a trekking agency is legitimate?",
      answer: "You can verify agency information through the Department of Tourism and Trekking Agencies Association of Nepal."
    },
    {
      id: 7,
      question: "Does this rule apply to expats and diplomats?",
      answer: "Yes, the rule applies to all foreign nationals, including diplomats and expats. Only Nepali citizens are exempt."
    },
    {
      id: 8,
      question: "What about motorcycle or bus rides to trekking areas?",
      answer: "The guide requirement does not apply to motorcycle or bus rides to places like Muktinath. However, TIMS and relevant area permits are still required."
    }
  ];

  useEffect(() => {
    const demoUpdates = [
      {
        id: 1,
        title: "New Cultural Tour Package",
        description: "Explore the rich cultural heritage with our new guided tour package",
        date: "2024-01-15",
        image: "https://images.unsplash.com/photo-1599622662667-e91b74191ec1?ixlib=rb-4.0.3"
      },
      {
        id: 2,
        title: "Mountain Trekking Discount",
        description: "Get 20% off on all mountain trekking packages this season",
        date: "2024-01-10",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3"
      },
      {
        id: 3,
        title: "Historical Tours Available",
        description: "Join our expert guides for fascinating historical tours",
        date: "2024-01-05",
        image: "https://images.unsplash.com/photo-1531686264889-56fdcabd163f?ixlib=rb-4.0.3"
      }
    ];
    setUpdates(demoUpdates);
  }, []);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <>
      <div className="image-container">
        <img src={tourImage} alt="Tour Updates" className="full-image" />
      </div>
      
      <div className="container mt-5">
        <h3 className="text-center mb-4 animate-title">Frequently Asked Questions</h3>
        <div className="faq-section">
          {faqData.map((faq, index) => (
            <div 
              className={`card mb-3 faq-card animate-faq`} 
              key={faq.id}
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div 
                className={`card-header d-flex justify-content-between align-items-center hover-effect ${openFaq === faq.id ? 'active' : ''}`}
                onClick={() => toggleFaq(faq.id)}
              >
                <h5 className="mb-0 faq-question">{faq.question}</h5>
                <span className={`arrow ${openFaq === faq.id ? 'rotate' : ''}`}>
                  <i className="fas fa-chevron-down"></i>
                </span>
              </div>
              <div className={`collapse-content ${openFaq === faq.id ? 'show' : ''}`}>
                <div className="card-body answer-animation">
                  <p className="card-text">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .image-container {
          width: 100%;
          height: calc(100vh - 80px); // Adjust for navbar height
          margin-top: -24px;
          overflow: hidden;
          position: relative;
        }

        .full-image {
          width: 100%;
          height: 100%;
          object-fit: contain;  // Changed from cover to contain
          background-color: #000;  // Dark background for letterboxing
          position: relative;
          transition: transform 0.5s ease;
        }

        .full-image:hover {
          transform: scale(1.02);  // Reduced scale for better visibility
        }

        .animate-title {
          animation: slideDown 0.8s ease-out;
        }

        .animate-card {
          opacity: 0;
          animation: slideIn 0.8s ease-out forwards;
        }

        .animate-faq {
          opacity: 0;
          animation: slideUp 0.8s ease-out forwards;
        }

        .update-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .card-img-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-img-top {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .update-card:hover .card-img-top {
          transform: scale(1.1);
        }

        .date-badge {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.8em;
        }

        .card-img-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
          transition: opacity 0.3s ease;
        }

        .update-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .faq-card {
          border: none;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-card:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .hover-effect {
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 15px 20px;
        }

        .hover-effect.active {
          background-color: #007bff;
          color: white;
        }

        .hover-effect:hover {
          background-color: #f8f9fa;
        }

        .hover-effect.active:hover {
          background-color: #0056b3;
        }

        .faq-question {
          transition: transform 0.3s ease;
        }

        .hover-effect:hover .faq-question {
          transform: translateX(10px);
        }

        .arrow {
          transition: all 0.3s ease;
          color: #007bff;
        }

        .active .arrow {
          color: white;
        }

        .arrow.rotate {
          transform: rotate(-180deg);
        }

        .collapse-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .collapse-content.show {
          max-height: 500px;
          opacity: 1;
        }

        .answer-animation {
          animation: fadeIn 0.5s ease-out;
          transform-origin: top;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tour-image-wrapper {
          padding: 20px;
          perspective: 1000px;
        }

        .tour-image-container {
          width: 100%;
          height: 500px;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .tour-image-container:hover {
          transform: translateY(-10px) scale(1.01);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .tour-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
          filter: brightness(0.9);
        }

        .tour-image-container:hover .tour-main-image {
          transform: scale(1.1);
          filter: brightness(0.7);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0.6)
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 40px;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .tour-image-container:hover .image-overlay {
          opacity: 1;
        }

        .overlay-title {
          color: white;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 15px;
          transform: translateY(20px);
          transition: transform 0.5s ease;
        }

        .overlay-text {
          color: #f0f0f0;
          font-size: 1.2rem;
          transform: translateY(20px);
          transition: transform 0.5s ease;
        }

        .tour-image-container:hover .overlay-title,
        .tour-image-container:hover .overlay-text {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .tour-image-container {
            height: 300px;
          }
          
          .overlay-title {
            font-size: 1.8rem;
          }
          
          .overlay-text {
            font-size: 1rem;
          }
        }

        .tour-image-container {
          width: 100%;
          height: 400px;
          overflow: hidden;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .tour-image-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .tour-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .tour-image-container:hover .tour-main-image {
          transform: scale(1.05);
        }
      `}</style>
    </>
    
  );
};

export default TourUpdates;
