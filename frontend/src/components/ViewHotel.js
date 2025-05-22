import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/View.module.css";
import Destinations from "./hotelimages";

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
      currentPage: 1,
      hotelsPerPage: 10,
      maxPrice: 100000,
      selectedPrice: 100000,
      locations: [],
      selectedLocation: "All",
      selectedCategory: "All",
      searchPackageName: "",
      searchLocationText: "",
    };
  }

  componentDidMount() {
    this.retrieveHotels();
  }

  retrieveHotels() {
    axios.get("http://localhost:8070/hotel/all").then((res) => {
      if (res.data.success) {
        const hotels = res.data.existingHotels;
        const locations = ["All", ...new Set(hotels.map((h) => h.location))];
        this.setState({ hotels, locations });
      }
    });
  }

  getLowestRoomPrice(hotel) {
    if (!hotel.roomTypes || hotel.roomTypes.length === 0) return "N/A";
    const prices = hotel.roomTypes
      .map((room) => parseFloat(room.price))
      .filter((p) => !isNaN(p));
    if (prices.length === 0) return "N/A";
    return Math.min(...prices);
  }

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  getFilteredHotels() {
    const {
      hotels,
      selectedPrice,
      selectedLocation,
      selectedCategory,
      searchPackageName,
      searchLocationText,
    } = this.state;

    let filtered = hotels;

    filtered = filtered.filter(
      (hotel) =>
        hotel.roomTypes &&
        hotel.roomTypes.some(
          (room) =>
            !isNaN(room.price) && parseFloat(room.price) <= selectedPrice
        )
    );

    if (selectedLocation !== "All") {
      filtered = filtered.filter((hotel) => hotel.location === selectedLocation);
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (hotel) =>
          hotel.type.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchPackageName.trim() !== "") {
      filtered = filtered.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchPackageName.toLowerCase())
      );
    }

    if (searchLocationText.trim() !== "") {
      filtered = filtered.filter((hotel) =>
        hotel.location.toLowerCase().includes(searchLocationText.toLowerCase())
      );
    }

    return filtered;
  }

  filterByPrice = (e) => {
    const selectedPrice = parseInt(e.target.value, 10);
    this.setState({ selectedPrice, currentPage: 1 });
  };

  handleLocationSearchText = (e) => {
    this.setState({ searchLocationText: e.target.value, currentPage: 1 });
  };

  handlePackageNameSearch = (e) => {
    this.setState({ searchPackageName: e.target.value, currentPage: 1 });
  };

  render() {
    const {
      currentPage,
      hotelsPerPage,
      selectedPrice,
      searchLocationText,
      searchPackageName,
    } = this.state;

    const filteredHotels = this.getFilteredHotels();

    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

    const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

    return (
      
      <div
        className={styles.body}
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          textAlign: "left",
        }}
      >          

        {/* Home Section */}
        <section
          className={styles.home2}
          style={{ textAlign: "left", paddingLeft: "20px", paddingRight: "20px" }}
        >
          <div className={styles.home2_text} style={{ textAlign: "left" }}>
            <h1>Spend Your Holiday</h1>
            <p>
              Enthusiastically extend extensive customer service before <br /> best breed convergence completely.
            </p>

          </div>
        </section>
          <Destinations/>
          <div className={styles.heading} style={{ textAlign: "center" }}>
            <h1>
              Our <span>Rooms</span>
            </h1>
          </div>

        {/* Offer Section */}
        <section className={styles.offer} style={{ paddingLeft: "20px", paddingRight: "20px"}}>
          <div
            className={styles.container}
            style={{ margin: 0, maxWidth: "100%", padding: 0 }}
          >
            <div className="row p-0" style={{ marginLeft: 0, marginRight: 0}}>
              {/* Sidebar for Filters */}
              <div
                className="col-md-2 p-0"
                style={{
                  height: "100vh",
                  backgroundColor: "#fff",
                  padding: "15px",
                  position: "sticky",
                  top: "0",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  fontSize: "14px",
                  color: "#333",
                  borderRight: "1px solid #eee",
                  overflowY: "auto",
                  marginLeft: 0,
                  textAlign: "left",
                }}
              >
                {/* Location Search */}
                <div style={{ marginBottom: "30px" }}>
                  <h4
                    style={{
                      fontWeight: "600",
                      marginBottom: "10px",
                      borderBottom: "2px solid orange",
                      paddingBottom: "5px",
                    }}
                  >
                    Location Search
                  </h4>
                  <input
                    type="text"
                    placeholder="Search By Location"
                    value={searchLocationText}
                    onChange={this.handleLocationSearchText}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <h4
                    style={{
                      fontWeight: "600",
                      marginBottom: "10px",
                      borderBottom: "2px solid orange",
                      paddingBottom: "5px",
                    }}
                  >
                    Type Search
                  </h4>
                 <input
                  className="form-control mb-4"
                  type="search"
                  placeholder="Search type of hotel"
                  value={searchPackageName}
                  onChange={this.handlePackageNameSearch}
                />

                {/* Filter By Price */}
                <div style={{ marginBottom: "10px" }}>
                  <h4
                    style={{
                      fontWeight: "600",
                      marginBottom: "10px",
                      borderBottom: "2px solid orange",
                      paddingBottom: "5px",
                    }}
                  >
                    Filter By Price
                  </h4>
                  <input
                    type="range"
                    min="0"
                    max={this.state.maxPrice}
                    step="1000"
                    value={selectedPrice}
                    onChange={this.filterByPrice}
                    style={{
                      width: "100%",
                      height: "6px",
                      borderRadius: "5px",
                      background:
                        "linear-gradient(to right, #f90 0%, #f90 " +
                        ((selectedPrice / this.state.maxPrice) * 100).toFixed(2) +
                        "%, #ddd " +
                        ((selectedPrice / this.state.maxPrice) * 100).toFixed(2) +
                        "%, #ddd 100%)",
                      outline: "none",
                      WebkitAppearance: "none",
                      cursor: "pointer",
                    }}
                  />
                </div>

                {/* Price Range Display */}
                <div style={{ fontSize: "14px", color: "#555", fontWeight: "600" }}>
                  Price : NRS 0 - NRS {selectedPrice.toLocaleString()}
                </div>
              </div>

              {/* Hotels Section */}
              <div
                className="col-md-10"
                style={{ paddingLeft: "30px", paddingRight: "15px", textAlign: "left" }}
              >
               
                

                {/* Hotel Cards */}
                <div className="row">
                  {currentHotels.length > 0 ? (
                    currentHotels.map((hotel) => (
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
                              {[...Array(5)].map((_, i) =>
                                i < hotel.rating ? (
                                  <AiFillStar key={i} />
                                ) : (
                                  <AiOutlineStar key={i} />
                                )
                              )}
                            </div>
                            <p className={styles.availableRooms}>
                              <strong>Available Rooms:</strong> {hotel.no_of_rooms}
                            </p>
                            <p className={styles.price}>
                              <strong>Starting From:</strong> NRS{" "}
                              {this.getLowestRoomPrice(hotel).toLocaleString()}
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
                    ))
                  ) : (
                    <p>No hotels found matching your criteria.</p>
                  )}
                </div>

                {/* Pagination */}
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => this.paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>

                    {/* Show only page 1 if totalPages = 1 */}
                    {totalPages > 1 &&
                      Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <li
                            key={number}
                            className={`page-item ${
                              currentPage === number ? "active" : ""
                            }`}
                          >
                            <button
                              onClick={() => this.paginate(number)}
                              className="page-link"
                              aria-current={currentPage === number ? "page" : undefined}
                            >
                              {number}
                            </button>
                          </li>
                        )
                      )}

                    <li
                      className={`page-item ${
                        currentPage === totalPages || totalPages === 0 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => this.paginate(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        aria-label="Next"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {/* <div
          className={styles.gallery}
          style={{ textAlign: "left", paddingLeft: "20px", paddingRight: "20px" }}
        >
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
        </div> */}
        <Footer/>
      </div>
    );
  }
}
