import React, { useState } from "react";
import axios from "axios";
import myStyle from "../style_sheets/Style.module.css";
import galle from "../img/Travelo.jpeg";

function AddPackage() {
  const [packName, setName] = useState("");
  const [packID, setPid] = useState("");
  const [Destination, setDesti] = useState("");
  const [NumOfDays, setDays] = useState("");
  const [NumOfPassen, setPass] = useState("");
  const [hotel, setHotel] = useState("");
  const [transport, setTrans] = useState("");
  const [tourGuide, setGuide] = useState("");
  const [TotPrice, setPrice] = useState("");
  const [description, setDescription] = useState(""); // New state for description
  const [destinations, setDestinations] = useState([]); // Array for destinations
  const [images, setImages] = useState(null); // State for image files

  // Function to handle image uploads
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  // Function to handle destination array
  const handleDestinationChange = (e) => {
    const destArray = e.target.value.split(",").map((item) => item.trim());
    setDestinations(destArray);
  };

  function sendData(e) {
    e.preventDefault();

    const formData = new FormData();

    // Append package data to FormData
    formData.append("packName", packName);
    formData.append("packID", packID);
    formData.append("Destination", Destination);
    formData.append("NumOfDays", NumOfDays);
    formData.append("NumOfPassen", NumOfPassen);
    formData.append("hotel", hotel);
    formData.append("transport", transport);
    formData.append("tourGuide", tourGuide);
    formData.append("TotPrice", TotPrice);
    formData.append("description", description);
    formData.append("destinations", JSON.stringify(destinations));

    // Append each image to FormData
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    axios
      .post("http://localhost:8070/package/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Package Added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container p-3 mb-2 bg-white">
      <form onSubmit={sendData}>
        <img
          className={myStyle.logo}
          src={galle}
          style={{ position: "absolute", right: 1300, top: 26 }}
          height={50}
          width={200}
          alt="Travelo Logo"
        />
        <a
          className="btnHome"
          href="/man"
          style={{ position: "absolute", right: 50, top: 600 }}
        >
          Home
        </a>

        <div className="header2">
          <h1 className="header">
            <strong>
              <center>Enter New Tour Package Details</center>
            </strong>
          </h1>
          <br />
        </div>

        <br />
        <br />

        {/* Two Column Layout */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* Left Column */}
          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="pacName">
              <strong>Package Name *</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="pacName"
              placeholder="Enter package name here"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="packId">
              <strong>Package ID *</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="packId"
              placeholder="Enter package ID here"
              onChange={(e) => setPid(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="desti">
              <strong>Destination *</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="desti"
              placeholder="Enter destinations separated by commas"
              onChange={handleDestinationChange}
            />
          </div>

          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="numDays">
              <strong>Number of days *</strong>
            </label>
            <input
              type="number"
              className="form-control"
              id="numDays"
              min="1"
              max="7"
              placeholder="Enter days between 1 and 7"
              onChange={(e) => setDays(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="numPass">
              <strong>Number of passengers *</strong>
            </label>
            <input
              type="number"
              className="form-control"
              id="numPass"
              min="1"
              max="15"
              placeholder="Enter passengers between 1 and 15"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="hotel">
              <strong>Hotel Name *</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="hotel"
              placeholder="Enter hotel name"
              onChange={(e) => setHotel(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="transport">
              <strong>Transport Mode *</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="transport"
              placeholder="Enter transport type"
              onChange={(e) => setTrans(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="tourGuide">
              <strong>Tour Guide *</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="tourGuide"
              placeholder="Enter guide name or info"
              onChange={(e) => setGuide(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="totPrice">
              <strong>Total Price *</strong>
            </label>
            <input
              type="number"
              className="form-control"
              id="totPrice"
              placeholder="Enter total price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Right Column */}
          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="description">
              <strong>Description *</strong>
            </label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Enter a description of the package"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="images">
              <strong>Package Images</strong>
            </label>
            <input
              type="file"
              className="form-control"
              id="images"
              multiple
              onChange={handleImageChange}
            />
          </div>
        </div>

        <br />
        <button
          type="submit"
          className="btn btn-success"
          style={{ position: "absolute", right: 300, top: 600 }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPackage;
