import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/View.module.css";

import add from "../img/add.jpg";
import photo1 from "../img/hl1.jpg";
import photo2 from "../img/hl2.jpg";
import photo3 from "../img/hl3.jpg";
import photo4 from "../img/hl4.jpg";
import photo5 from "../img/hl5.jpg";
import photo6 from "../img/hl6.jpg";
import photo7 from "../img/hl7.jpg";
import photo0 from "../img/hl0.jpg";
import { AiFillStar } from "react-icons/ai";

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
        this.setState({
          hotels: res.data.existingHotels,
        });

        console.log(this.state.hotels);
      }
    });
  }

  filterContent(_hotels, searchTerm) {
    const results = _hotels.filter((hotels) =>
      hotels.type.toLowerCase().includes(searchTerm)
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
        {/* <!--Home section---> */}
        <section className={styles.home2}>
          <div className={styles.home2_text}>
            <h1>Spend Your Holiday</h1>
            <p>
              Enthusiastically extend extensive customer service before{" "}
              <br></br> best breed convergence completely.
            </p>
            <a href="#" className={styles.home2_btn}>
              Let's go now
            </a>
          </div>
        </section>

        <section className={styles.offer}>
          <div className={styles.container}>
            <input
              className="form-control"
              type="search"
              placeholder="Search type of hotel"
              name="searchTerm"
              onChange={this.handleTextSearch}
            ></input>
            <div className={styles.heading}>
              <h1>
                Our <span>Rooms</span>
              </h1>
            </div>

            <div className={styles.content}>
              {this.state.hotels.map((hotels, index) => (
                <>
                  <Link
                    key={hotels._id}
                    to={`/insert/hotel/${hotels._id}`}
                    type="submit"
                    className={styles.link}
                  >
                    <div className={styles.box}>
                      <div className={styles.left}>
                        <h4>{hotels.name}</h4>
                        <img src={add} className={styles.add}></img>
                      </div>
                      <div class="right" className={styles.right}>
                        <h4> {hotels.type} </h4>
                        <div className={styles.rate}>
                          <i className={styles.logo3}>
                            <AiFillStar />
                          </i>
                          <i className={styles.logo3}>
                            <AiFillStar />
                          </i>
                          <i className={styles.logo3}>
                            <AiFillStar />
                          </i>
                          <i className={styles.logo3}>
                            <AiFillStar />
                          </i>
                        </div>
                        <p> Excepteur sint occaecat cupidatat non proident.</p>
                        <p>{hotels.location}</p>
                        <h5>{hotels.price} / per Night</h5>
                        {/* <button className={styles.flex1}>
              <span>Check Availability</span>
              <i className={styles.logo3}><FaArrowAltCircleRight/></i>
            </button> */}

                        <button className={styles.flex1}>
                          <span>Resevation</span>
                          <i className={styles.logo3}>
                            <FaArrowAltCircleRight />
                          </i>
                        </button>
                      </div>
                    </div>
                  </Link>
                </>
              ))}
            </div>
          </div>
        </section>

        {/* <!--gallery section---> */}
        <div className={styles.gallery}>
          <h1>
            Our <span>gallery</span>
          </h1>
          <div className={styles.main_gallery}>
            <div className={styles.inner_gallery}>
              <img src={photo0} className={styles.hl0}></img>
            </div>
            <div className={styles.inner_gallery}>
              <img src={photo1} className={styles.hl1}></img>
            </div>
            <div className={styles.inner_gallery}>
              <img src={photo2} className={styles.hl2}></img>
            </div>
            <div className={styles.inner_gallery}>
              <img src={photo3} className={styles.hl3}></img>
            </div>
            <div className={styles.inner_gallery}>
              <img src={photo4} className={styles.hl4}></img>
            </div>

            <div className={styles.inner_gallery}>
              <img src={photo5} className={styles.hl5}></img>
            </div>

            <div className={styles.inner_gallery}>
              <img src={photo6} className={styles.hl6}></img>
            </div>
            <div className={styles.inner_gallery}>
              <img src={photo7} className={styles.hl7}></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
