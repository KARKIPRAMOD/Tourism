import React, { useState } from "react";
import styles from "../style_sheets/Destinations.module.css";

import photo0 from "../guide/guide1.jpg";
import photo1 from "../guide/guide2.jpg";
import photo2 from "../guide/guide3.jpg";
import photo3 from "../guide/guide4.jpg";
import photo4 from "../guide/guide5.jpg";
import photo5 from "../guide/guide6.jpg";
import photo6 from "../guide/guide7.jpg";
import photo7 from "../guide/guide9.jpg";




const destinations = [
  {
    src: photo0,
  },
  {
    src: photo1,
  },
  {
    src: photo2,
  },
  {
    src: photo3,
  },
  {
    src: photo4,
  },
  {
    src: photo5,
  },
  {
    src: photo6,
  },
  {
    src: photo7,
  },

 
];




const Destinations = () => {
  const [activeIndex, setActiveIndex] = useState(7); // Start near center

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
        <span className={styles.highlight}>EXPLORE</span> GUIDES
      </h2>
      <div className={styles.carousel}>
        {destinations.map((item, index) => (
          <div
            key={index}
            className={getCardStyle(index)}
            onClick={() => handleClick(index)}
          >
            <img src={item.src}  />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
