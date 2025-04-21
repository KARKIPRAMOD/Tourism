import React, { useState } from 'react';

const TourGuideFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services do tour guides provide?",
      answer: "Tour guides provide various services including guided tours, local knowledge sharing, historical information, cultural insights, navigation assistance, and translation services when needed."
    },
    {
      question: "How much does it cost to hire a tour guide?",
      answer: "Tour guide costs vary depending on experience, duration, and location. Typically prices range from Rs. 2000-5000 per day. Contact individual guides for specific rates."
    },
    {
      question: "How do I book a tour guide?",
      answer: "You can book a tour guide through our platform by selecting your preferred guide, checking their availability, and clicking the 'Book' button. You'll need to provide your travel dates and requirements."
    },
    {
      question: "Can I customize my tour with a guide?",
      answer: "Yes! Most of our guides offer customizable tour packages. You can discuss your specific interests and preferences with the guide to create a personalized itinerary."
    },
    {
      question: "What qualifications do your tour guides have?",
      answer: "All our tour guides are licensed professionals with extensive knowledge of local history, culture, and attractions. Many have years of experience and speak multiple languages."
    },
    {
      question: "What about permits taken before April 1st, 2023?",
      answer: "Trekkers who obtained permits and started their trek before April 1st, 2023 are not required to have a guide. However, they must have entered the trekking area before April 1st."
    },
    {
      question: "Do I need a guide for mountain bike treks?",
      answer: "Yes, all treks including mountain bike treks need to comply with the guide requirement. You can contact a trekking agency in Nepal for a guide who can accompany you on mountain bikes."
    },
    {
      question: "Are experienced trekkers or mountaineering association members exempt?",
      answer: "No, the rule applies to all foreign national trekkers, regardless of experience level or association membership."
    },
    {
      question: "Where exactly are guides mandatory?",
      answer: "Guides are mandatory in all areas where TIMS is applicable and in all national park areas in the mountains. The rule does not apply to Kathmandu Valley outskirts, Pokhara outskirts, or hiking areas around major cities."
    },
    {
      question: "Can I hire a guide directly or must I go through an agency?",
      answer: "It is mandatory to hire a licensed trekking guide through a government-registered trekking agency."
    },
    {
      question: "How can I verify if a trekking agency is legitimate?",
      answer: "You can verify agency information through the Department of Tourism and Trekking Agencies Association of Nepal."
    },
    {
      question: "Does this rule apply to expats and diplomats in Nepal?",
      answer: "Yes, the rule applies to all foreign nationals, including diplomats and expats. Only Nepali citizens are exempt from this requirement."
    },
    {
      question: "What about motorcycle or bus rides to trekking areas?",
      answer: "The guide requirement does not apply to motorcycle or bus rides. However, you still need TIMS and relevant area permits where applicable."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container" style={styles.container}>
      <h1 style={styles.header}>Frequently Asked Questions</h1>
      <div className="faq-list" style={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item" style={styles.faqItem}>
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(index)}
              style={styles.questionButton}
            >
              {faq.question}
              <span style={styles.icon}>{activeIndex === index ? '−' : '+'}</span>
            </button>
            {activeIndex === index && (
              <div className="faq-answer" style={styles.answer}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={styles.buttonContainer}>
        <a href="/view" className="btn btn-primary" style={styles.backButton}>
          Back to Tour Guides
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '2.5em'
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  faqItem: {
    borderBottom: '1px solid #eee'
  },
  questionButton: {
    width: '100%',
    padding: '15px',
    textAlign: 'left',
    backgroundColor: '#f8f9fa',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.1em',
    color: '#2c3e50',
    transition: 'background-color 0.3s'
  },
  answer: {
    padding: '15px',
    backgroundColor: '#fff',
    color: '#666',
    lineHeight: '1.6'
  },
  icon: {
    fontSize: '1.5em',
    fontWeight: 'bold'
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '30px'
  },
  backButton: {
    padding: '10px 30px',
    borderRadius: '20px',
    textDecoration: 'none'
  }
};
<section style={{ padding: "60px 80px", backgroundColor: "#ffffff" }}>
<div className="container">
  <h2 className="text-center mb-5" style={{ fontWeight: "700", fontSize: "32px" }}>
    Things to Do in Nepal
  </h2>

  <div className="row">
    {/* Left Column */}
    <div className="col-md-6">
      {[
        "Trekking",
        "Zip Flying",
        "Sky Diving",
        "Bungee Jumping",
        "Motor Biking",
        "Rafting & Kayaking",
        "Canyoning",
        "Mountain Biking",
        "Paragliding",
        "Hiking",
      ].map((activity, index) => (
        <p
          key={index}
          className="text-start"
          style={{
            fontWeight: "600",
            fontSize: "20px",
            marginBottom: "20px",
            color: "#155263",
          }}
        >
          • {activity}
        </p>
      ))}
    </div>

    {/* Right Column */}
    <div className="col-md-6">
      {[
        "Camping",
        "Cave Exploration",
        "Hot Air Balloon",
        "Bird Watching",
        "Mountain Viewing",
        "Jungle Discovery",
        "Butterfly Watching",
        "Nagarkot Sunrise and Sunset",
        "Wetlands",
        "Traditional Crafts",
      ].map((activity, index) => (
        <p
          key={index}
          className="text-start"
          style={{
            fontWeight: "600",
            fontSize: "20px",
            marginBottom: "20px",
            color: "#155263",
          }}
        >
          • {activity}
        </p>
      ))}
    </div>
  </div>

  {/* Button */}
  <div className="text-center mt-5">
  </div>
</div>
</section>

export default TourGuideFAQ;
