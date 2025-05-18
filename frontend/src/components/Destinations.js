import React, { useState } from "react";
import styles from "../style_sheets/Destinations.module.css";

const destinations = [
  {
    src: "https://th.bing.com/th/id/OIP.wPJSkrVDPOL_8LOXptaHoQHaEK?cb=iwc2&rs=1&pid=ImgDetMain",
    title: "Mount Everest Base Camp",
  },
  {
    src: "https://th.bing.com/th/id/OIP.hnA9SRh69gcf5muX4ad3MAHaE8?cb=iwc2&rs=1&pid=ImgDetMain",
    title: "Phewa Lake, Pokhara",
  },
  {
    src: "https://th.bing.com/th/id/OIP.mjHQOt9GBhs9Bw5tcvjIIgHaFj?cb=iwc2&rs=1&pid=ImgDetMain",
    title: "Chitwan National Park",
  },
  {
    src: "https://th.bing.com/th/id/OIP.ho8qS84uTYq9Qdnp72uMVQHaEz?cb=iwc2&rs=1&pid=ImgDetMain",
    title: "Lumbini - Birthplace of Buddha",
  },
  {
    src: "https://th.bing.com/th/id/OIP.l3QYRiAjLrhVRaviHVKj1gHaES?cb=iwc2&rs=1&pid=ImgDetMain",
    title: "Kathmandu Durbar Square",
  },
  {
    src: "https://risingnepaldaily.com/storage/media/6196/625799337d2e2_Untitled-1.jpg",
    title: "Pashupatinath Temple",
  },
  {
    src: "https://th.bing.com/th/id/OIP.lUleStXnBoglHdCtq_9UHQHaE7?cb=iwc2&rs=1&pid=ImgDetMain",
    title: "Boudhanath Stupa",
  },
  {
    src: "https://th.bing.com/th/id/OIP.RwsVs7i3me0_7pHzLUygsAHaES?cb=iwc2&rs=1&pid=ImgDetMain",
    title: "Tihar Festival Celebrations",
  },
  {
    src: "https://omgnepal.com/wp-content/uploads/2019/03/44.jpg",
    title: "Traditional Nepali Music & Dance",
  },
  {
    src: "https://th.bing.com/th/id/OIP.w1PLKuSLFZrRW0gglBeQ0gHaD2?cb=iwc2&w=770&h=400&rs=1&pid=ImgDetMain",
    title: "Himalayan Mountain Trekking",
  },
  {
    src: "https://th.bing.com/th/id/OIP.lf1tM866gTofXUb3ZyhrpQHaFi?cb=iwc2&rs=1&pid=ImgDetMain",
    title: "Gosaikunda Lake Trek",
  },
  {
    src: "https://th.bing.com/th/id/OIP.Y7kDk0d_2abBdXm4RdBAJQHaEV?cb=iwc2&rs=1&pid=ImgDetMain",
    title: "Patan Handicraft Market",
  },
  {
    src: "https://th.bing.com/th/id/OIP._0ZkiMtyhySblqqblM3JCAHaEK?w=322&h=181&c=7&r=0&o=5&cb=iwc2&dpr=1.3&pid=1.7",
    title: "Annapurna Mountain Range",
  },
  {
    src: "https://th.bing.com/th/id/OIP.NioTp6vfVVDlokTmI97_NwHaE8?cb=iwc2&rs=1&pid=ImgDetMain",
    title: "Machhapuchhre (Fishtail Peak)",
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
        <span className={styles.highlight}>EXPLORE</span> NEPAL
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
