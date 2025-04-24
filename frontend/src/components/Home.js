import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

//import css file from style sheets directory
import styleHome from "../style_sheets/Home.module.css";

//import images from img directory
import coverImg from "../img/Beach.jpg";
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

const Home = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedback from the database when the component mounts
  // useEffect(() => {
  //   const fetchFeedback = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8070/feedBack/all"); // Replace with your actual API endpoint
  //       const data = await response.json();
  //       setFeedbacks(data);
  //     } catch (error) {
  //       console.error("Error fetching feedback:", error);
  //     }
  //   };

  //   fetchFeedback();
  // }, []);

  // Toggle function to open/close the feedback form
  const toggleFeedbackForm = () => {
    setIsFeedbackOpen(!isFeedbackOpen);
  };

  //  "Trekking",
  //               "Zip Flying",
  //               "Sky Diving",
  //               "Bungee Jumping",
  //               "Motor Biking",
  //               "Rafting & Kayaking",
  //               "Canyoning",
  //               "Mountain Biking",
  //               "Paragliding",
  //               "Hiking",

  const thingToDO = [
    {
      image: "https://vietchallenge.com/images/uploads/trekking2.jpg",
      alt: "Trekking",
      description: "Trekking",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.to9XW2aHcEKiLExDTzWRzAHaEK?w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      alt: "Zip Flying",
      description: "Zip Flying",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.iZEvBHcyhAtCeTGy2bQ26wHaE8?rs=1&pid=ImgDetMain",
      alt: "Sky Diving",
      description: "Sky Diving",
    },
    {
      image:
        "https://neptrek.com/wp-content/uploads/2024/02/The-Cliff-at-Kushma-the-best-place-for-Bungee-Jumping-in-Nepal.jpg",
      alt: "Bungee Jumping",
      description: "Bungee Jumping",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.3Qgqv8g2Em0cQeP7rHd2-wHaDc?rs=1&pid=ImgDetMain",
      alt: "Motor Biking",
      description: "Motor Biking",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.YiSCWVyCKAtlAMDMD8ONqgHaE8?rs=1&pid=ImgDetMain",
      alt: "Rafting ",
      description: "Rafting",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.miycVxAMy4j7Mf8jrQcjewHaEH?rs=1&pid=ImgDetMain",
      alt: "Canyoying",
      description: "Canyoying",
    },
    {
      image:
        "https://th.bing.com/th/id/R.4cf3acbb948c13cee6365bae5d9eaa62?rik=RS9UQyvW3hipeg&riu=http%3a%2f%2fwww.sidetracked.com%2fwp-content%2fuploads%2f2013%2f07%2fpf_nepalstory_037-1600x1000.jpg&ehk=eWtDJqUvxJTCGu5ZQb3jMFHQY%2b4miDi38QLp%2bI7HSf0%3d&risl=&pid=ImgRaw&r=0",
      alt: "Mountain Biking",
      description: "Mountain Biking",
    },
    {
      image:
        "https://th.bing.com/th/id/R.ac2fb96091ed2e998a18bc5e73e73c9f?rik=HqmxT40J8JeFhw&riu=http%3a%2f%2ftourstreknepal.com%2fwp-content%2fuploads%2f2015%2f02%2fparaglidinginnepal.jpg&ehk=OwV68OkjQltkj4darK5mekLja5vmPwXLcDt1GSZhKXY%3d&risl=&pid=ImgRaw&r=0",
      alt: "Paragliding",
      description: "Paragliding",
    },
  ];

  return (
    <>
      <div className={styleHome.container}>
        <img src={coverImg} alt="Cover Beach" className={styleHome.img} />
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
          padding: "60px 80px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="container">
          <div
            style={{
              fontWeight: "700",
              fontSize: "42px",
              marginBottom: "5rem",
              textAlign: "center",
            }}
          >
            <label className="text-center">About Us</label>
            <div style={{ fontSize: "16px", fontWeight: "500", color: "gray" }}>
              A little description of our site on how we work and server the
              service towards you
            </div>
          </div>
          {/* Centered Welcome Text */}
          <p
            style={{
              fontWeight: "700",
              fontSize: "26px",
              marginBottom: "30px",
              textAlign: "left",
            }}
          >
            Welcome to YatraPath
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "7rem",
              marginBottom: "5rem",
            }}
          >
            <div>
              <img src="" alt="welcome" />
            </div>
            <div>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "gray" }}>
                Hey there, traveler! We’re so glad you found us. YatraPath was
                born from a simple idea traveling should be joyful, not
                stressful. We know how confusing it can be to juggle multiple
                apps just to plan one trip. That’s why we created a place where
                everything you need hotel bookings, local guides, travel tips,
                even a friend group all under one digital roof. Whether you’re a
                solo backpacker, a couple on a getaway, or a group chasing
                adventure, YatraPath is here to make your journey through Nepal
                smooth, safe, and full of memories.
              </p>
            </div>
          </div>
          {/* Centered Welcome Text */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "7rem",
              marginBottom: "5rem",
            }}
          >
            <div>
              <p
                className="text-center"
                style={{
                  fontWeight: "700",
                  fontSize: "28px",
                  marginBottom: "30px",
                }}
              >
                Our Vision
              </p>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "gray" }}>
                We dream of a world where travel connects people, cultures, and
                communities in beautiful ways. Our vision is to become Nepal’s
                most trusted travel platform, not just by offering bookings and
                support, but by making every journey meaningful. We want every
                traveler to feel the magic of Nepal—and every local business to
                grow from the love of tourism done right.
              </p>
            </div>
            <div>
              <img
                src="https://img.freepik.com/free-photo/business-strategy-success-target-goals_1421-33.jpg?t=st=1745340390~exp=1745343990~hmac=a445379c80b0b030b186fd59c343a9c1c1e4075b48e55e7e202fc881cdcf9c84&w=1380"
                alt="our vision"
                style={{
                  borderRadius: "16px",
                }}
              />
            </div>
          </div>
          {/* Centered Welcome Text */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "7rem",
              marginBottom: "3rem",
            }}
          >
            <div>
              <img
                src="https://img.freepik.com/free-photo/businessman-touching-virtual-screen_1232-737.jpg?t=st=1745341616~exp=1745345216~hmac=1c393cb33c509e73b64803c412d65af6995e39fd479ac715b8ddaa76c66859d1&w=1380"
                alt="our mission"
                style={{
                  borderRadius: "16px",
                }}
              />
            </div>
            <div>
              <p
                className="text-center"
                style={{
                  fontWeight: "700",
                  fontSize: "22px",
                  marginBottom: "30px",
                }}
              >
                Our Mission
              </p>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "gray" }}>
                At YatraPath, we’re on a mission to make travel planning easier
                and more personal. We combine smart technology with a human
                touch, helping you find trusted guides, cozy places to stay, and
                exciting things to do—all while supporting the local people who
                make Nepal so special. We believe that great trips aren’t just
                about where you go, but about who you meet and what you
                experience along the way.
              </p>
            </div>
          </div>
          {/* Centered Welcome Text */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "7rem",
              marginBottom: "3rem",
            }}
          >
            <div>
              <p
                className="text-center"
                style={{
                  fontWeight: "700",
                  fontSize: "22px",
                  marginBottom: "30px",
                }}
              >
                What Makes Us Different
              </p>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "gray" }}>
                We’re more than just a booking site—we’re your travel buddy. Our
                platform gives you the power to plan your trip your way, with
                help from an AI chatbot that’s always there to answer your
                questions (even the silly ones!). You can book verified guides,
                chat with fellow travelers, read travel stories, and find tips
                on what to do and where to go. It’s simple, helpful, and made
                with love—for people who love to explore.
              </p>
            </div>
            <div>
              <img
                src="https://img.freepik.com/free-photo/young-man-making-scales-gesture-shirt-jacket-pants-looking-confident-front-view_176474-88930.jpg?t=st=1745342219~exp=1745345819~hmac=a23423b5c50911d1983a291bdfc8d8e93c7c2325badb44a0c718075a42980281&w=1380"
                alt="what makes us different"
                style={{
                  borderRadius: "16px",
                }}
              />
            </div>
          </div>
          {/* Centered Welcome Text */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "7rem",
              marginBottom: "3rem",
            }}
          >
            <div>
              <img
                src="https://img.freepik.com/free-photo/young-friends-top-mountain-enjoying-mesmerizing-view_181624-30260.jpg?t=st=1745342380~exp=1745345980~hmac=6b10c6188c0c74bcd4dbed903dac8aea35a556d0baa622a6157b163357da93b7&w=1380"
                alt="why nepal"
                style={{ borderRadius: "16px" }}
              />
            </div>
            <div>
              <p
                className="text-center"
                style={{
                  fontWeight: "700",
                  fontSize: "22px",
                  marginBottom: "30px",
                }}
              >
                why Nepal?
              </p>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "gray" }}>
                Nepal isn’t just a destination it’s a feeling. From the snowy
                peaks of the Himalayas to the bustling streets of Kathmandu,
                every corner of this country has a story to tell. We’re proud to
                be from here, and even prouder to share it with the world.
                YatraPath exists to help you discover not just famous spots, but
                also the hidden gems, local flavors, and heartwarming moments
                that make Nepal unforgettable.
              </p>
            </div>
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
              {/* Left Column */}
              {/* <div className="col-md-6">
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
            </div> */}

              {/* Right Column */}
              <div
                className="col-md-6"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "40px",
                  paddingTop: "2rem",
                }}
              >
                {/* {[
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
              ))} */}
                {thingToDO?.map((value, index) => {
                  return (
                    <div className={styleHome.thigsToDo}>
                      <ThingsToDo
                        image={value.image}
                        alt={value.alt}
                        name={value.description}
                      />
                    </div>
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
      <button
        onClick={toggleFeedbackForm}
        className="btn btn-secondary"
        style={{
          position: "fixed",
          bottom: "90px", // Move it up a bit
          right: "10px", // Keep it on the right
          zIndex: 1000, // Optional, if needed for stacking context
        }}
      >
        Give Feedback
      </button>
      {/* Feedback Form Component */}
      <FeedbackForm isOpen={isFeedbackOpen} toggleForm={toggleFeedbackForm} />
      {/* ChatBot Component */}
      <ChatBot />
      <Footer />
    </>
  );
};

export default Home;
