import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

//import css file from style sheets directory
import styleHome from "../style_sheets/Home.module.css";

//import images from img directory
import paymentImg from "../img/ezpayment.png";
import nearbyImg from "../img/Nearby.png";
import covidImg from "../img/Safe.png";
import priceImg from "../img/Prices.png";

// Import the ChatBot component
import ChatBot from "./ChatBot";
import FeedbackForm from "./feedbackform";
import Destinations from "./Destinations";
import ThingsToDo from "./ThingsToDo";
import FeedBackComp from "./feedbackComp";
import Footer from "./Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const gradientHeader = (color1, color2) => ({
  fontWeight: "700",
  fontSize: "40px",
  background: `linear-gradient(to right, ${color1}, ${color2})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

const subTextStyle = {
  fontSize: "18px",
  color: "#666",
  maxWidth: "600px",
  margin: "auto",
};

const twoColumnGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "50px",
  alignItems: "center",
};

const imageStyle = {
  width: "100%",
  borderRadius: "15px",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
};

const subHeader = {
  fontSize: "28px",
  fontWeight: "600",
  marginBottom: "20px",
};

const paragraphText = {
  fontSize: "16px",
  color: "#444",
  lineHeight: "1.6",
};

const serviceGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px",
};

const serviceCard = {
  backgroundColor: "#f9f9f9",
  borderRadius: "15px",
  padding: "30px",
  textAlign: "center",
  boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
  transition: "transform 0.3s",
};

const serviceTitle = {
  fontSize: "22px",
  marginBottom: "10px",
  color: "#333",
};

const Home = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  const toggleFeedbackForm = () => {
    setIsFeedbackOpen(!isFeedbackOpen);
  };

  const thingToDO = [
    {
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJla2tpbmd8ZW58MHx8MHx8fDA%3D",
      alt: "Trekking",
      description: "Trekking",
      link: "trekking",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.to9XW2aHcEKiLExDTzWRzAHaEK?w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      alt: "Zip Flying",
      description: "Zip Flying",
      link: "zipflying",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.iZEvBHcyhAtCeTGy2bQ26wHaE8?rs=1&pid=ImgDetMain",
      alt: "Sky Diving",
      description: "Sky Diving",
      link: "skydiving",
    },
    {
      image:
        "https://media.istockphoto.com/id/547436912/photo/bungee-jumping.jpg?s=612x612&w=0&k=20&c=yGAdtv_o5h9uzsLhHFxU9al_H-3EzgSCuqRiJ9Hq08A=",
      alt: "Bungee Jumping",
      description: "Bungee",
      link: "bungeejumping",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.3Qgqv8g2Em0cQeP7rHd2-wHaDc?rs=1&pid=ImgDetMain",
      alt: "Motor Biking",
      description: "Motor Biking",
      link: "motorbiking",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.YiSCWVyCKAtlAMDMD8ONqgHaE8?rs=1&pid=ImgDetMain",
      alt: "Rafting ",
      description: "Rafting",
      link: "rafting",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.miycVxAMy4j7Mf8jrQcjewHaEH?rs=1&pid=ImgDetMain",
      alt: "Canyoying",
      description: "Canyoying",
      link: "canyoying",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.xE77SnlewTz4DGhtFRngvgHaEK?w=304&h=182&c=7&r=0&o=5&cb=iwc2&dpr=1.3&pid=1.7",
      alt: "Mountain Biking",
      description: "Mountain Biking",
      link: "mountainbiking",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.ScrX41wYWIac8BIkHbBM1wHaE9?cb=iwc2&rs=1&pid=ImgDetMain",
      alt: "Paragliding",
      description: "Paragliding",
      link: "paragliding",
    },
  ];

  return (
    <>
      <div className={styleHome.container}>
        <img src={"https://ankitsenvlogs.com/wp-content/uploads/2023/07/Nepal-Travel-Guide-1.jpg"
} alt="Cover Beach" className={styleHome.img} />
        <div className={styleHome.layer}>
          <div className={styleHome.centered}>
            <div className={styleHome.headerTxt}>TRAVEL TO EXPLORE</div>
            <div className={styleHome.sloganTxt}>
              Stop worrying about the potholes in the road and enjoy the journey{" "}
              <br />~ Babs Hoffman ~
            </div>
          </div>
        </div>
      </div>
      <div
        className={`row row-cols-md-4 g-5`}
        style={{ margin: "40px 70px 0px 70px" }}
      >
        <div className={`col`}>
          <div className={`card h-100 ${styleHome.cardContainer}`}>
            <div className={styleHome.imgBg}>
              <img
                src={priceImg}
                className={`card-img-top ${styleHome.cardImg}`}
                alt="..."
              />
            </div>
            <div
              className={`card-body`}
              style={{ marginLeft: "10px", marginRight: "15px" }}
            >
              <h5 className={`card-title ${styleHome.cardHeader}`}>
                Get Best Prices
              </h5>
              <p className={`card-text ${styleHome.cardDes}`}>
                Pay through our application and save thousands and get amazing
                rewards
              </p>
            </div>
          </div>
        </div>
        <div className={`col`}>
          <div className={`card h-100 ${styleHome.cardContainer}`}>
            <div className={styleHome.imgBg}>
              <img
                src={covidImg}
                className={`card-img-top ${styleHome.cardImg}`}
                style={{ width: "45px" }}
                alt="..."
              />
            </div>
            <div
              className={`card-body`}
              style={{ marginLeft: "10px", marginRight: "20px" }}
            >
              <h5 className={`card-title ${styleHome.cardHeader}`}>Safty</h5>
              <p className={`card-text ${styleHome.cardDes}`}>
                We provide safe spaces by ensuring our partnered hotels follow
                top hygiene and safety practices.
              </p>
            </div>
          </div>
        </div>
        <div className={`col`}>
          <div className={`card h-100 ${styleHome.cardContainer}`}>
            <div className={styleHome.imgBg}>
              <img
                src={paymentImg}
                className={`card-img-top ${styleHome.cardImg}`}
                style={{ width: "45px", marginTop: "5px" }}
                alt="..."
              />
            </div>
            <div
              className={`card-body`}
              style={{ marginLeft: "10px", marginRight: "20px" }}
            >
              <h5 className={`card-title ${styleHome.cardHeader}`}>
                Flexible Payment
              </h5>
              <p className={`card-text ${styleHome.cardDes}`}>
                Enjoy the flexible payment through our app and get rewards on
                every payment
              </p>
            </div>
          </div>
        </div>
        <div className={`col`}>
          <div className={`card h-100 ${styleHome.cardContainer}`}>
            <div className={styleHome.imgBg}>
              <img
                src={nearbyImg}
                className={`card-img-top ${styleHome.cardImg}`}
                style={{ width: "45px" }}
                alt="..."
              />
            </div>
            <div
              className={`card-body`}
              style={{ marginLeft: "10px", marginRight: "20px" }}
            >
              <h5 className={`card-title ${styleHome.cardHeader}`}>
                Find The Best Near You
              </h5>
              <p className={`card-text ${styleHome.cardDes}`}>
                Find the best hotels and places to visit near you in a single
                click
              </p>
            </div>
          </div>
        </div>
      </div>
      <section
        className={styleHome.reviewSection}
        style={{
          padding: "80px 60px",
          backgroundColor: "#f0f4f8",
        }}
      >
        {/* About Us Section */}
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={gradientHeader("#ff6a00", "#ee0979")}>About Us</h2>
            <p style={subTextStyle}>
              Learn how we make your travel easier, safer, and more fun ✨
            </p>
          </div>

          <div style={twoColumnGrid}>
            <img
              src="https://img.freepik.com/free-vector/travel-around-world-concept-illustration_114360-8515.jpg"
              alt="About Us Visual"
              style={imageStyle}
            />

            <div>
              <h3 style={subHeader}>
                Welcome to <span style={{ color: "#ff6a00" }}>YatraPath</span>
              </h3>
              <p style={paragraphText}>
                At YatraPath, we believe that travel should be seamless and
                joyful...
              </p>
              <p style={{ ...paragraphText, marginTop: "15px" }}>
                With real-time information, smart bookings, and personalized
                recommendations...
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Our Services Section */}
      <section
        style={{
          padding: "80px 60px",
          backgroundColor: "#fff",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={gradientHeader("#0f2027", "#2c5364")}>Our Services</h2>
            <p style={subTextStyle}>
              Everything you need for a perfect journey 🚀
            </p>
          </div>

          <div style={serviceGrid}>
            {[
              {
                title: "Flight Booking",
                desc: "Find the best flights at the best prices.",
              },
              {
                title: "Hotel Reservations",
                desc: "Top-rated hotels with verified reviews.",
              },
              {
                title: "Tour Guides",
                desc: "Licensed guides to enrich your travel experience.",
              },
              {
                title: "Vehicle Rental",
                desc: "Cars, bikes & more, ready when you are.",
              },
            ].map((service, index) => (
              <div key={index} style={serviceCard}>
                <div style={{ marginBottom: "10px" }}>{service.icon}</div>
                <h3 style={serviceTitle}>{service.title}</h3>
                <p style={{ fontSize: "16px", color: "#666" }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "40px 40px", backgroundColor: "#f0f4f8" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2
              style={{
                fontWeight: "700",
                fontSize: "40px",
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Why Choose YatraPath?
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#666",
                maxWidth: "600px",
                margin: "auto",
              }}
            >
              Trusted by thousands of happy travelers ✈️
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              alignItems: "center",
            }}
          >
            <div>
              <ul
                style={{ listStyle: "none", paddingLeft: 0, lineHeight: "2" }}
              >
                <p>
                  <li>✅ Easy and secure bookings</li>
                </p>

                <p>
                  <li>✅ 24/7 customer support</li>{" "}
                </p>
                <p>
                  <li>✅ Verified reviews and recommendations</li>{" "}
                </p>
                <p>
                  <li>✅ Seamless itinerary planning</li>{" "}
                </p>
              </ul>
            </div>
            <img
              src="https://img.freepik.com/free-vector/kathmandu-nepal-city-skyline-with-color-buildings-blue-sky-reflections-vector-illustration-business-travel-tourism-concept-with-historic-architecture-kathmandu-cityscape-with-landmarks_119523-6465.jpg?size=626&ext=jpg"
              alt="Why Choose Us"
              style={{
                width: "100%",
                borderRadius: "15px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        </div>
      </section>
      <section>
        <Destinations />
      </section>
      <section
        style={{ padding: "60px 190px 0px 0px", backgroundColor: "#ffffff" }}
      >
        <div className="container">
          <h2
            className="text-center mb-5"
            style={{ fontWeight: "700", fontSize: "32px" }}
          >
            Things to Do in Nepal
          </h2>

          <div
            className="row"
            style={{
              backgroundImage: ` url(
                "https://ntb.gov.np/storage/website/landscape2-44237cb6.jpeg"
              )`,
              width: "98vw",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.79)",
                height: "60rem",
                padding: "40px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div
                className="col-md-6"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "40px",
                  paddingTop: "2rem",
                }}
              >
              {thingToDO?.map((value, index) => {
  return (
    <Link key={value.link} to={`/${value.link}`}>
      <div className={styleHome.thigsToDo}>
        <ThingsToDo
          image={value.image}
          alt={value.alt}
          name={value.description}
        />
      </div>
    </Link>
  );
})}

              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://ntb.gov.np/storage/website/nepal-55265453.png"
                  alt="map of nepal"
                />
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="text-center mt-5"></div>
        </div>
      </section>
      <div
        className="mt-5"
        style={{
          marginBottom: "4rem",
        }}
      >
        <h3 className="text-center mb-4 ">Nepal's #1 platform for tourism</h3>
        <div
          style={{
            padding: "10px",
          }}
        >
          <FeedBackComp />
        </div>
      </div>
      {/* ChatBot Component - Bottom Right */}
      <ChatBot />
      {/* WhatsApp Floating Icon - Above ChatBot */}
      <a
        href="https://chat.whatsapp.com/HCw1h4K2pUp6l1vSnj8GLH"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "90px", // Just above chatbot
          right: "20px",
          backgroundColor: "#25D366",
          color: "white",
          borderRadius: "50%",
          width: "65px",
          height: "65px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
          zIndex: 1000,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <i className="fab fa-whatsapp" style={{ fontSize: "28px" }}></i>
      </a>
      {/* Feedback Button - Top */}
      <button
        onClick={toggleFeedbackForm}
        style={{
          position: "fixed",
          bottom: "170px",
          right: "25px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
        }}
      >
        <i className="fas fa-comment-dots" style={{ fontSize: "24px" }}></i>
      </button>
      {/* Feedback Form Component */}
      <FeedbackForm isOpen={isFeedbackOpen} toggleForm={toggleFeedbackForm} />
      <Footer />
    </>
  );
};

export default Home;
