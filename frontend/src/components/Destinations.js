import React from "react";
import styleHome from "../style_sheets/Home.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Destinations = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const images = [
    {
      src: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
      alt: "Boat on Calm Water",
      description: "Boat on Calm Water",
    },
    {
      src: "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp",
      alt: "Wintry Mountain Landscape",
      description: "Wintry Mountain Landscape",
    },
    {
      src: "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp",
      alt: "Mountains in the Clouds",
      description: "Mountains in the Clouds",
    },
    {
      src: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp",
      alt: "Waves at Sea",
      description: "Waves at Sea",
    },
    {
      src: "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp",
      alt: "Yosemite National Park",
      description: "Yosemite National Park",
    },
  ];

  return (
    <div style={{ padding: "100px 100px 20px 100px" }}>
      <p className={`text-center ${styleHome.destinationHeading}`}>
        <span style={{ color: "#4468E2" }}>BEST</span> DESTINATIONS
      </p>
      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000}>
        {images.map((image, index) => (
          <div key={index} className="px-2">
            <img
              src={image.src}
              className="w-100 shadow-1-strong rounded"
              alt={image.alt}
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div
              style={{
                fontWeight: "600",
                fontFamily: "Poppins",
                fontSize: "20px",
                color: "#40525C",
              }}
            >
              {image.description}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Destinations;
