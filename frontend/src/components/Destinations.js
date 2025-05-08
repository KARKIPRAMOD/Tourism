import React, { useState } from "react";
import styles from "../style_sheets/Destinations.module.css";

const destinations = [
  {
    src: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
    title: "Boat on Calm Water",
  },
  {
    src: "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp",
    title: "Wintry Mountain Landscape",
  },
  {
    src: "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp",
    title: "Cloud-Covered Mountains",
  },
  {
    src: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp",
    title: "Waves at Sea",
  },
  {
    src: "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp",
    title: "Yosemite National Park",
  },
];

const Destinations = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start from middle

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const getCardStyle = (index) => {
    const position = index - activeIndex;

    switch (position) {
      case -2:
        return `${styles.card} ${styles.left2}`;
      case -1:
        return `${styles.card} ${styles.left1}`;
      case 0:
        return `${styles.card} ${styles.center}`;
      case 1:
        return `${styles.card} ${styles.right1}`;
      case 2:
        return `${styles.card} ${styles.right2}`;
      default:
        return `${styles.card} ${styles.hidden}`;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <span className={styles.highlight}>BEST</span> DESTINATIONS
      </h2>
      <div className={styles.carousel}>
        {destinations.map((item, index) => (
          <div
            key={index}
            className={getCardStyle(index)}
            onClick={() => handleClick(index)}
          >
            <img src={item.src} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
