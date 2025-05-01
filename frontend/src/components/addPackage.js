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
  const [images, setImages] = useState([]); // Change state to handle multiple images

  function handleImageChange(e) {
    setImages(e.target.files); // Store all selected files in the state
  }

  function sendData(e) {
    e.preventDefault();

    const newPackage = {
      packName,
      packID,
      Destination,
      NumOfDays,
      NumOfPassen,
      hotel,
      transport,
      tourGuide,
      TotPrice,
    };

    const formData = new FormData();
    formData.append("packName", packName);
    formData.append("packID", packID);
    formData.append("Destination", Destination);
    formData.append("NumOfDays", NumOfDays);
    formData.append("NumOfPassen", NumOfPassen);
    formData.append("hotel", hotel);
    formData.append("transport", transport);
    formData.append("tourGuide", tourGuide);
    formData.append("TotPrice", TotPrice);

    // Append all selected images to formData
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
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

        <div>
          <div className="form-group" style={{ width: "400px" }}>
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
          <br />

          <div className="form-group" style={{ width: "400px" }}>
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
          <br />

          <div className="form-group" style={{ width: "400px" }}>
            <label htmlFor="desti">
              <strong>Destination *</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="desti"
              placeholder="Enter any destination"
              onChange={(e) => setDesti(e.target.value)}
            />
          </div>
          <br />

          <div className="form-group" style={{ width: "400px" }}>
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
          <br />

          <div className="form-group" style={{ width: "400px" }}>
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
        </div>

        <br />

        <div style={{ position: "absolute", top: 220, right: 300 }}>
          <div className="form-group" style={{ width: "400px" }}>
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
          <br />

          <div className="form-group" style={{ width: "400px" }}>
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
          <br />

          <div className="form-group" style={{ width: "400px" }}>
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
          <br />

          <div className="form-group" style={{ width: "400px" }}>
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
        </div>

        <div className="form-group">
          <label htmlFor="images">
            <strong>Package Images *</strong>
          </label>
          <input
            type="file"
            name="images"
            multiple
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          style={{ position: "absolute", right: 600, top: 600 }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPackage;
