import React from 'react';
import { Link } from 'react-router-dom';
import Footer from "./Footer";


const ThingsToDo = () => {
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
      alt: "Rafting",
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
    <div className="container mt-4">
      <h2 className="text-center mb-4">Things To Do</h2>
      <div className="row">
        {thingToDO.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img
                src={item.image}
                alt={item.alt}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.description}</h5>
                <Link to={`/${item.link}`} className="btn btn-primary">
                  Explore {item.description}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default ThingsToDo;
