import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/View.module.css";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaArrowAltCircleRight } from "react-icons/fa";

import photo0 from "../img/hl0.jpg";
import photo1 from "../img/hl1.jpg";
import photo2 from "../img/hl2.jpg";
import photo3 from "../img/hl3.jpg";
import photo4 from "../img/hl4.jpg";
import photo5 from "../img/hl5.jpg";
import photo6 from "../img/hl6.jpg";
import photo7 from "../img/hl7.jpg";

export default class ViewHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      displayedHotels: [],
      currentPage: 1,
      hotelsPerPage: 10,
      maxPrice: 100000, // Set maximum price to 1 Lakh NPR
      selectedPrice: 100000, // Default value for filter is 1 Lakh NPR
    };
  }

  componentDidMount() {
    this.retriveHotels();
  }

  retriveHotels() {
    axios.get("http://localhost:8070/hotel/all").then((res) => {
      if (res.data.success) {
        this.setState({ hotels: res.data.existingHotels }, () => {
          this.updateDisplayedHotels();
        });
      }
    });
  }

  updateDisplayedHotels() {
    const { hotels, currentPage, hotelsPerPage, selectedPrice } = this.state;
    const filteredHotels = hotels.filter((hotel) => hotel.price <= selectedPrice); // Filter based on selected price
    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);
    this.setState((prevState) => ({
      displayedHotels: [...prevState.displayedHotels, ...currentHotels],
    }));
  }

  filterByPrice = (e) => {
    const selectedPrice = e.target.value;
    this.setState({ selectedPrice, currentPage: 1, displayedHotels: [] }, () => {
      this.updateDisplayedHotels();
    });
  };

  handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios.get("http://localhost:8070/hotel/all").then((res) => {
      if (res.data.success) {
        const filteredHotels = res.data.existingHotels.filter((hotel) =>
          hotel.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.setState({ hotels: filteredHotels, currentPage: 1, displayedHotels: [] }, () => {
          this.updateDisplayedHotels();
        });
      }
    });
  };

  handleShowMore = () => {
    this.setState(
      (prevState) => ({ currentPage: prevState.currentPage + 1 }),
      () => {
        this.updateDisplayedHotels();
      }
    );
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
            <div className="row p-0" >
              {/* Sidebar for Price Filter */}
              <div className="col-md-3 p-0" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
                <div className={styles.sidebar} style={{ height: "100vh", backgroundColor: "#f1f1f1", padding: "20px", position: "sticky", top: "0" }}>
                  <h3>Filter by Price</h3>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={this.state.selectedPrice}
                    onChange={this.filterByPrice}
                    className="form-control"
                  />
                  <p>Max Price: NPR {this.state.selectedPrice}</p>
                </div>
              </div>

              {/* Hotels Section */}
              <div className="col-md-9">
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
                <div className="row">
                  {this.state.displayedHotels.map((hotel) => (
                    <div key={hotel._id} className="col-md-4 mb-4">
                      <div className={styles.hotelCard}>
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
                    </div>
                  ))}
                </div>

                {/* Show More Button */}
                <div className="text-center mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleShowMore}
                  >
                    Show More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <div className={styles.gallery}>
          <h1>
            Our <span>Gallery</span>
          </h1>
          <div className={styles.main_gallery}>
            {/* You can replace the static images with dynamic content if needed */}
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
