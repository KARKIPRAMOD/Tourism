import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { FaPlane, FaHotel, FaMapMarkedAlt, FaCar } from "react-icons/fa";

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
const serviceGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const serviceCardBase = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const serviceCardHover = {
  boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
  transform: "scale(1.05)",
};

const serviceTitle = {
  margin: "10px 0",
  fontSize: "20px",
  fontWeight: "600",
};

const iconBaseStyle = {
  marginBottom: "10px",
  color: "#4468E2",
  fontSize: "40px",
  transition: "transform 0.3s ease",
};

const iconHoverStyle = {
  transform: "translateY(-8px)",
};

function ServiceGrid() {
  const [hoverIndex, setHoverIndex] = useState(null);

  const services = [
    {
      icon: <FaPlane />,
      title: "Flight Booking",
      desc: "Find the best flights at the best prices.",
    },
    {
      icon: <FaHotel />,
      title: "Hotel Reservations",
      desc: "Top-rated hotels with verified reviews.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Tour Guides",
      desc: "Licensed guides to enrich your travel experience.",
    },

  ];

  return (
    <div style={serviceGrid}>
      {services.map((service, index) => (
        <div
          key={index}
          style={{
            ...serviceCardBase,
            ...(hoverIndex === index ? serviceCardHover : {}),
          }}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <div
            style={{
              ...iconBaseStyle,
              ...(hoverIndex === index ? iconHoverStyle : {}),
            }}
          >
            {service.icon}
          </div>
          <h3 style={serviceTitle}>{service.title}</h3>
          <p style={{ fontSize: "16px", color: "#666" }}>{service.desc}</p>
        </div>
      ))}
    </div>
  );
}


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



const serviceCard = {
  backgroundColor: "#f9f9f9",
  borderRadius: "15px",
  padding: "30px",
  textAlign: "center",
  boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
  transition: "transform 0.3s",
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
      <div className={styleHome.container} style={{ position: "relative", overflow: "hidden" }}>
  <img
    src="https://ankitsenvlogs.com/wp-content/uploads/2023/07/Nepal-Travel-Guide-1.jpg"
    alt="Cover Beach"
    className={styleHome.img}
    style={{
      width: "100%",
      height: "auto",
      transition: "transform 15s ease-in-out",
      animation: "zoomInOut 15s infinite alternate",
      objectFit: "cover",
    }}
  />

  <div
    className={styleHome.layer}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
  
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      textAlign: "center",
      padding: "0 20px",
      flexDirection: "column",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}
  >
    <div
      className={styleHome.centered}
      style={{
        animation: "fadeInUp 2s ease forwards",
        opacity: 0,
      }}
    >
      <div
        className={styleHome.headerTxt}
        style={{
          fontSize: "3.5rem",
          fontWeight: "900",
          letterSpacing: "0.15em",
          textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
          marginBottom: "1rem",
          textTransform: "uppercase",
          animationDelay: "0.5s",
          animationFillMode: "forwards",
        }}
      >
        TRAVEL TO EXPLORE
      </div>

      <div
        className={styleHome.sloganTxt}
        style={{
          fontSize: "1.5rem",
          fontWeight: "500",
          lineHeight: "1.4",
          maxWidth: "600px",
          margin: "0 auto",
          fontStyle: "italic",
          animationDelay: "1s",
          animationFillMode: "forwards",
        }}
      >
        Stop worrying about the potholes in the road and enjoy the journey <br />~ Babs Hoffman ~
      </div>
    </div>
  </div>

  <style>{`
    @keyframes zoomInOut {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.1);
      }
    }

    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .${styleHome.centered} {
      animation: fadeInUp 2s ease forwards;
    }
  `}</style>
</div>

    <div
  className={`row row-cols-md-4 g-5`}
  style={{ margin: "40px 70px 0px 70px" }}
>
  {[ 
    {
      img: priceImg,
      title: "Get Best Prices",
      desc: "Pay through our application and save thousands and get amazing rewards",
      imgStyle: {},
    },
    {
      img: covidImg,
      title: "Safety",
      desc: "We provide safe spaces by ensuring our partnered hotels follow top hygiene and safety practices.",
      imgStyle: { width: "45px" },
    },
    {
      img: paymentImg,
      title: "Flexible Payment",
      desc: "Enjoy the flexible payment through our app and get rewards on every payment",
      imgStyle: { width: "45px", marginTop: "5px" },
    },
    {
      img: nearbyImg,
      title: "Find The Best Near You",
      desc: "Find the best hotels and places to visit near you in a single click",
      imgStyle: { width: "45px" },
    },
  ].map(({ img, title, desc, imgStyle }, idx) => (
    <div key={idx} className={`col`}>
      <div
        className={`card h-100 ${styleHome.cardContainer}`}
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "pointer",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px)";
          e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
        }}
      >
        <div className={styleHome.imgBg} style={{ padding: "15px", textAlign: "center" }}>
          <img
            src={img}
            className={`card-img-top ${styleHome.cardImg}`}
            alt={title}
            style={{ ...imgStyle, maxHeight: "80px", objectFit: "contain" }}
          />
        </div>
        <div
          className={`card-body`}
          style={{ marginLeft: "10px", marginRight: "15px" }}
        >
          <h5
            className={`card-title ${styleHome.cardHeader}`}
            style={{ fontWeight: "700", color: "#ff6a00", letterSpacing: "0.05em" }}
          >
            {title}
          </h5>
          <p
            className={`card-text ${styleHome.cardDes}`}
            style={{ fontSize: "0.95rem", color: "#555", lineHeight: "1.4" }}
          >
            {desc}
          </p>
        </div>
      </div>
    </div>
  ))}
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

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        alignItems: "center",
        textAlign: "left",
      }}
    >
      {/* Animated SVG Container */}
      <div style={{ width: "100%", maxWidth: "400px", margin: "auto" }}>
        <svg
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto" }}
        >
          {/* Rotating globe */}
          <circle
            cx="150"
            cy="150"
            r="100"
            fill="url(#gradient)"
            stroke="#ff6a00"
            strokeWidth="3"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 150 150"
              to="360 150 150"
              dur="20s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Globe gradient */}
          <defs>
            <radialGradient id="gradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ff6a00" />
              <stop offset="100%" stopColor="#ee0979" />
            </radialGradient>
          </defs>

          {/* Clouds */}
          <ellipse
            cx="80"
            cy="90"
            rx="30"
            ry="12"
            fill="white"
            opacity="0.8"
            style={{ filter: "drop-shadow(0 0 3px rgba(0,0,0,0.1))" }}
          >
            <animateMotion dur="15s" repeatCount="indefinite" path="M0 0 L100 0" />
          </ellipse>
          <ellipse
            cx="130"
            cy="60"
            rx="20"
            ry="8"
            fill="white"
            opacity="0.7"
            style={{ filter: "drop-shadow(0 0 3px rgba(0,0,0,0.1))" }}
          >
            <animateMotion dur="10s" repeatCount="indefinite" path="M0 0 L120 0" />
          </ellipse>

          {/* Flying plane */}
          <polygon
            points="10,140 40,130 40,150"
            fill="#ff6a00"
            stroke="#ee0979"
            strokeWidth="1"
          >
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              rotate="auto"
              path="M-20 0 C50 -30, 100 30, 180 0"
            />
          </polygon>

          {/* Plane trail */}
          <path
            d="M-20 140 C50 110, 100 170, 180 140"
            stroke="#ee0979"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 10"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="20"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      {/* Text Content */}
      <div>
        <h3 style={{ ...subHeader, fontWeight: "700" }}>
          Welcome to <span style={{ color: "#ff6a00" }}>YatraPath</span>
        </h3>
        <p style={paragraphText}>
          At YatraPath, we believe that travel should be seamless and joyful,
          connecting you to the world with simplicity and trust.
        </p>
        <p style={{ ...paragraphText, marginTop: "15px" }}>
          With real-time information, smart bookings, and personalized
          recommendations, your adventure begins right here — tailored just
          for you.
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
      <h2 style={gradientHeader("#ff6a00", "#ee0979")}>Our Services</h2>
      <p style={subTextStyle}>
        Everything you need for a perfect journey 🚀
      </p>
    </div>


    <ServiceGrid />
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
       
          <FeedBackComp />
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
