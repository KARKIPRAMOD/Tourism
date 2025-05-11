import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/View.module.css";

import add from "../img/add.jpg";
import photo0 from "../img/hl0.jpg";
import photo1 from "../img/hl1.jpg";
import photo2 from "../img/hl2.jpg";
import photo3 from "../img/hl3.jpg";
import photo4 from "../img/hl4.jpg";
import photo5 from "../img/hl5.jpg";
import photo6 from "../img/hl6.jpg";
import photo7 from "../img/hl7.jpg";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default class ViewHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
    };
  }

  componentDidMount() {
    this.retriveHotels();
  }

  retriveHotels() {
    axios.get("http://localhost:8070/hotel/all").then((res) => {
      if (res.data.success) {
        this.setState({ hotels: res.data.existingHotels });
      }
    });
  }

  filterContent(_hotels, searchTerm) {
    const results = _hotels.filter((hotels) =>
      hotels.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ hotels: results });
  }

  handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios.get("http://localhost:8070/hotel/all").then((res) => {
      if (res.data.success) {
        this.filterContent(res.data.existingHotels, searchTerm);
      }
    });
  };

  render() {
    return (
      <div className={styles.body}>
        {/* Home Section */}
        <section className={styles.home2}>
          <div className={styles.home2_text}>
            <h1>Spend Your Holiday</h1>
            <p>
              Enthusiastically extend extensive customer service before{" "}
              <br /> best breed convergence completely.
            </p>
            <a href="#" className={styles.home2_btn}>
              Let's go now
            </a>
          </div>
        </section>

        {/* Offer Section */}
        <section className={styles.offer}>
          <div className={styles.container}>
            <input
              className="form-control mb-4"
              type="search"
              placeholder="Search type of hotel"
              onChange={this.handleTextSearch}
            />
            <div className={styles.heading}>
              <h1>
                Our <span>Rooms</span>
              </h1>
            </div>

            {/* Hotel Cards */}
            <div className={styles.cardGrid}>
              {this.state.hotels.map((hotel) => (
                <div key={hotel._id} className={styles.hotelCard}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={`http://localhost:8070/uploads/hotel_photos/${hotel.photos[0]}`}
                      alt="Hotel"
                      className={styles.hotelImage}
                    />
                  </div>
                  <div className={styles.hotelContent}>
                    <h3>Name: {hotel.name}</h3>
                    <p className={styles.location}>
                      <i className="fas fa-map-marker-alt"></i> Located At:{" "}
                      {hotel.location}
                    </p>
                    <div className={styles.rating}>
                      {[...Array(5)].map((_, i) => (
                        i < hotel.rating ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
                      ))}
                    </div>
                    <p className={styles.availableRooms}>
                      <strong>Available Rooms:</strong> {hotel.no_of_rooms}
                    </p>
                  
                    <Link
                      to={`/insert/hotel/${hotel._id}`}
                      className={`${styles.bookBtn} ${styles.btnHighlight}`}
                    >
                      Reserve Now <FaArrowAltCircleRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <div className={styles.gallery}>
          <h1>
            Our <span>Gallery</span>
          </h1>
          <div className={styles.main_gallery}>
            {[photo0, photo1, photo2, photo3, photo4, photo5, photo6, photo7].map(
              (photo, index) => (
                <div key={index} className={styles.inner_gallery}>
                  <img src={photo} alt={`Hotel ${index}`} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}
