import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import myStyle from "../style_sheets/Style.module.css";
import galle from "../img/Travelo.jpeg";

export default function EditPack() {
  const [name, setName] = useState("");
  const [packId, setPackID] = useState("");
  const [destination, setDesti] = useState("");
  const [numofdays, setDys] = useState("");
  const [nopass, setNopass] = useState("");
  const [hotel, setHotel] = useState("");
  const [transport, setTrans] = useState("");
  const [tourGuide, setGuide] = useState("");
  const [totPrice, setPrice] = useState("");

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getPackages();
  }, []);

  function getPackages() {
    let Package = true;

    fetch(`http://localhost:8070/package/get/${id}`)
      .then((res) => res.json())

      .then((result) => {
        if (Package) {
          setName(result.name);
          setPackID(result.packId);
          setDesti(result.destination);
          setDys(result.numofdays);
          setNopass(result.nopass);
          setHotel(result.hotel);
          setTrans(result.transport);
          setGuide(result.tourGuide);
          setPrice(result.totPrice);
        }
        console.log(result);
      });

    return () => (Package = false);
  }

  function updateData(e) {
    e.preventDefault();

    // Basic validation
    if (
      !name ||
      !packId ||
      !destination ||
      !nopass ||
      !numofdays ||
      !totPrice
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Package ID validation
    if (packId.length < 3) {
      alert("Package ID must be at least 3 characters");
      return;
    }

    // Price validation
    if (isNaN(totPrice) || parseFloat(totPrice) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    // Number of days validation
    if (isNaN(numofdays) || numofdays < 1 || numofdays > 7) {
      alert("Number of days must be between 1 and 7");
      return;
    }

    // Number of passengers validation
    if (isNaN(nopass) || nopass < 1 || nopass > 15) {
      alert("Number of passengers must be between 1 and 15");
      return;
    }

    const updatePackage = {
      name,
      packId,
      destination,
      nopass,
      numofdays,
      hotel,
      transport,
      tourGuide,
      totPrice,
    };

    axios
      .patch(`http://localhost:8070/package/update/${id}`, updatePackage)
      .then((response) => {
        if (response.status === 200) {
          alert("Package successfully updated");
          history.push("/manage/AllPacks"); // Using history.push instead of window.location.href
        } else {
          alert("Update failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        const errorMessage =
          err.response?.data?.message ||
          "Database error. Please check your connection and try again.";
        alert(errorMessage);
      });
  }

  return (
    <div className="container">
      <br></br>
      <div style={{ position: "absolute", right: 20, top: 10 }}>
        {" "}
        <div className="header3">
          <img
            className="logo"
            src={galle}
            style={{ position: "absolute", right: 1280, top: 15 }}
            height={50}
            width={200}
            alt="Card image cap"
          ></img>
          <a
            className={myStyle.btnHome2}
            href="/man"
            style={{ position: "absolute", right: 120, top: 20 }}
          >
            Home
          </a>
          <div>
            {" "}
            <h1>
              <strong>
                <center>Update package details</center>
              </strong>
            </h1>
            <br></br>
          </div>
        </div>{" "}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <form
        className={myStyle.hh + " form-group"}
        style={{ right: 1200 }}
        onSubmit={updateData}
      >
        <div className="form-row" style={{ width: "900px" }}>
          <div className="form-group col-md-6">
            <label htmlFor="name">
              Package Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Package Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <br></br>
          <div className="form-group col-md-6">
            <label htmlFor="packId">
              Package ID <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="packId"
              placeholder="Package ID"
              value={packId}
              onChange={(e) => {
                setPackID(e.target.value);
              }}
              required
              minLength="3"
            />
          </div>
          <br></br>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="desti">
                Destination <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="desti"
                placeholder="Enter Destination"
                value={destination}
                onChange={(e) => {
                  setDesti(e.target.value);
                }}
                required
              />
            </div>
            <br></br>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="nOfP">
              Number of passengers <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="nOfP"
              placeholder="Enter passengers between 1 and 15"
              min="1"
              max="15"
              value={nopass}
              onChange={(e) => {
                setNopass(e.target.value);
              }}
              required
            />
          </div>
        </div>{" "}
        <div className="form-row" style={{ width: "900px" }}>
          <div className="form-group col-md-6">
            <label htmlFor="days">
              Number of days <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="days"
              placeholder="Enter days between 1 and 7"
              min="1"
              max="7"
              value={numofdays}
              onChange={(e) => {
                setDys(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <br></br>
      </form>
      <form className="form-group" style={{ width: "20px" }}>
        <div style={{ position: "absolute", top: 195, right: 250 }}>
          <div className="form-group col-md-6" style={{ width: "500px" }}>
            <label htmlFor="hotel">Hotel/Other</label>
            <select
              className="form-control"
              id="hotel"
              value={hotel}
              onChange={(e) => {
                setHotel(e.target.value);
              }}
            >
              <option value="None">None</option>
              <option value="Camping">Camping</option>
              <option value="NCG Holiday (pvt)">NCG Holiday (pvt)</option>
              <option value="Jitwing (pvt)">Jitwing (pvt)</option>
              <option value="Paradice resolt Rsd(pvt)">
                Paradice resolt Rsd(pvt)
              </option>
            </select>
          </div>
          <br></br>

          <div className="form-row">
            <div className="form-group col-md-6" style={{ width: "500px" }}>
              <label htmlFor="trans">Transport</label>
              <select
                className="form-control"
                id="trans"
                value={transport}
                onChange={(e) => {
                  setTrans(e.target.value);
                }}
              >
                <option value="None">None</option>
                <option value="Dilanka Cabs/Transports">
                  Dilanka Cabs/Transports
                </option>
                <option value="NCG Transport(pvt)">NCG Transport(pvt)</option>
                <option value="Selinaiyo Lanka Vehicle Center">
                  Selinaiyo Lanka Vehicle Center
                </option>
                <option value="SK and sons(pvt)">SK and sons(pvt)</option>
              </select>
            </div>
            <br></br>
            <div className="form-group col-md-6" style={{ width: "500px" }}>
              <label htmlFor="guide">Tour guide</label>
              <select
                className="form-control"
                id="guide"
                value={tourGuide}
                onChange={(e) => {
                  setGuide(e.target.value);
                }}
              >
                <option value="with">with</option>
                <option value="without">without</option>
              </select>
            </div>
          </div>
          <br></br>

          <div className="form-row">
            <div className="form-group col-md-6" style={{ width: "500px" }}>
              <label htmlFor="totPrice">
                Total price(Rs) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="totPrice"
                placeholder="Enter total price here"
                value={totPrice}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="form-row mt-4">
            <div className="form-group col-md-12" style={{ width: "500px" }}>
              <Link to="/manage/AllPacks" className={myStyle.btnBack}>
                Back
              </Link>
              &nbsp;&nbsp;
              <button
                type="submit"
                className={myStyle.btnUpdate2}
                onClick={updateData}
              >
                Update Package
              </button>
            </div>
          </div>
        </div>
      </form>

      <br></br>
      <br></br>

      <div className="card-footer text-muted"></div>
    </div>
  );
}
