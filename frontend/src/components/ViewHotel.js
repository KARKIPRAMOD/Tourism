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
      maxPrice: 100000,
      selectedPrice: 100000,
      locations: [],
      selectedLocation: "All",
      selectedDays: "All",
      selectedPersons: "All",
      selectedSort: "New Packages",
      selectedCategory: "All",
      searchPackageName: "",
      searchLocationText: "",
    };
  }

  componentDidMount() {
    this.retriveHotels();
  }

  retriveHotels() {
    axios.get("http://localhost:8070/hotel/all").then((res) => {
      if (res.data.success) {
        const hotels = res.data.existingHotels;
        const locations = ["All", ...new Set(hotels.map((h) => h.location))];
        this.setState({ hotels, locations }, () => {
          this.updateDisplayedHotels();
        });
      }
    });
  }

  updateDisplayedHotels() {
    const {
      hotels,
      currentPage,
      hotelsPerPage,
      selectedPrice,
      selectedLocation,
      selectedCategory,
      searchPackageName,
      searchLocationText,
    } = this.state;

    let filteredHotels = hotels;

    // Filter by Price
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.price <= selectedPrice
    );

    // Filter by Location (dropdown)
    if (selectedLocation !== "All") {
      filteredHotels = filteredHotels.filter(
        (hotel) => hotel.location === selectedLocation
      );
    }

    // Filter by Category (simple example: matches hotel.type)
    if (selectedCategory !== "All") {
      filteredHotels = filteredHotels.filter(
        (hotel) =>
          hotel.type.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by package name search (searchPackageName)
    if (searchPackageName.trim() !== "") {
      filteredHotels = filteredHotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchPackageName.toLowerCase())
      );
    }

    // Filter by location search text (searchLocationText)
    if (searchLocationText.trim() !== "") {
      filteredHotels = filteredHotels.filter((hotel) =>
        hotel.location.toLowerCase().includes(searchLocationText.toLowerCase())
      );
    }

    // TODO: Add filtering for Days, Persons, Sort if needed here

    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

    this.setState((prevState) => ({
      displayedHotels:
        currentPage === 1
          ? currentHotels
          : [...prevState.displayedHotels, ...currentHotels],
    }));
  }

  filterByPrice = (e) => {
    const selectedPrice = parseInt(e.target.value, 10);
    this.setState({ selectedPrice, currentPage: 1 }, () => {
      this.updateDisplayedHotels();
    });
  };

  filterByLocation = (e) => {
    const selectedLocation = e.target.value;
    this.setState({ selectedLocation, currentPage: 1 }, () => {
      this.updateDisplayedHotels();
    });
  };

  filterByCategory = (category) => {
    this.setState({ selectedCategory: category, currentPage: 1 }, () => {
      this.updateDisplayedHotels();
    });
  };

  handlePackageNameSearch = (e) => {
    const val = e.target.value;
    this.setState({ searchPackageName: val, currentPage: 1 }, () => {
      this.updateDisplayedHotels();
    });
  };

  handleLocationSearchText = (e) => {
    const val = e.target.value;
    this.setState({ searchLocationText: val, currentPage: 1 }, () => {
      this.updateDisplayedHotels();
    });
  };

  handleDaysChange = (e) => {
    this.setState({ selectedDays: e.target.value, currentPage: 1 }, () => {
      // Add logic if needed
      this.updateDisplayedHotels();
    });
  };

  handlePersonsChange = (e) => {
    this.setState({ selectedPersons: e.target.value, currentPage: 1 }, () => {
      // Add logic if needed
      this.updateDisplayedHotels();
    });
  };

  handleSortChange = (e) => {
    this.setState({ selectedSort: e.target.value, currentPage: 1 }, () => {
      // Add logic to sort the hotels accordingly
      this.updateDisplayedHotels();
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
    const categories = ["All", "Holiday", "Mountains & Hills", "Vacation"];

    return (
      <div className={styles.body}>
        {/* Home Section */}
        <section className={styles.home2}>
          <div className={styles.home2_text}>
            <h1>Spend Your Holiday</h1>
            <p>
              Enthusiastically extend extensive customer service before <br /> best breed convergence completely.
            </p>
            <a href="#" className={styles.home2_btn}>
              Let's go now
            </a>
          </div>
        </section>

        {/* Offer Section */}
        <section className={styles.offer}>
          <div className={styles.container}>
            <div className="row p-0">
              {/* Sidebar for Filters */}
              <div
                className="col-md-3 p-0"
                style={{
                  height: "100vh",
                  backgroundColor: "#fff",
                  padding: "20px",
                  position: "sticky",
                  top: "0",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  fontSize: "14px",
                  color: "#333",
                  borderRight: "1px solid #eee",
                  overflowY: "auto",
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
                    value={this.state.searchLocationText}
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
                    value={this.state.selectedPrice}
                    onChange={this.filterByPrice}
                    style={{
                      width: "100%",
                      height: "6px",
                      borderRadius: "5px",
                      background:
                        "linear-gradient(to right, #f90 0%, #f90 " +
                        ((this.state.selectedPrice / this.state.maxPrice) * 100).toFixed(2) +
                        "%, #ddd " +
                        ((this.state.selectedPrice / this.state.maxPrice) * 100).toFixed(2) +
                        "%, #ddd 100%)",
                      outline: "none",
                      WebkitAppearance: "none",
                      cursor: "pointer",
                    }}
                  />
                </div>

                {/* Price Range Display */}
                <div style={{ fontSize: "14px", color: "#555", fontWeight: "600" }}>
                  Price : NRS 0 - NRS {this.state.selectedPrice.toLocaleString()}
                </div>
              </div>

              {/* Hotels Section */}
              <div className="col-md-9">
                <input
                  className="form-control mb-4"
                  type="search"
                  placeholder="Search type of hotel"
                  onChange={(e) =>
                    this.setState(
                      { searchPackageName: e.target.value, currentPage: 1 },
                      () => this.updateDisplayedHotels()
                    )
                  }
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
                  <button className="btn btn-primary" onClick={this.handleShowMore}>
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
