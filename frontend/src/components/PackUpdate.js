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
  console.log(id);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    fetch(`http://localhost:8070/package/get/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted && result) {
          setName(result.packName || "");
          setPackID(result.packID || "");
          setDesti(result.Destination || "");
          setDys(result.NumOfDays || "");
          setNopass(result.NumOfPassen || "");
          setHotel(result.Hotel || "");
          setTrans(result.Transport || "");
          setGuide(result.TourGuide || "");
          setPrice(result.TotPrice || "");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch package:", err);
        alert("Failed to load package details. Please try again.");
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  function updateData(e) {
    e.preventDefault();

    const updatePackage = {
      packName: name,
      packID: packId,
      Destination: destination,
      NumOfDays: Number(numofdays),
      NumOfPassen: Number(nopass),
      Hotel: hotel,
      Transport: transport,
      TourGuide: tourGuide,
      TotPrice: totPrice,
    };

    axios
      .patch(`http://localhost:8070/package/update/${id}`, updatePackage)
      .then((response) => {
        if (response.status === 200) {
          alert("Package successfully updated");
          history.push("/manage/AllPacks");
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
      <form
        className={myStyle.hh + " form-group"}
        style={{ maxWidth: "900px", marginLeft: "400px" }}
        onSubmit={updateData}
      >
        <div className="form-row">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="name">
              Package Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Package Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // removed required
            />
          </div>

          <div className="form-group col-md-6 mb-3">
            <label htmlFor="packId">
              Package ID <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="packId"
              placeholder="Package ID"
              value={packId}
              onChange={(e) => setPackID(e.target.value)}
              // removed required and minLength
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="desti">
              Destination <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="desti"
              placeholder="Enter Destination"
              value={destination}
              onChange={(e) => setDesti(e.target.value)}
              // removed required
            />
          </div>

          <div className="form-group col-md-6 mb-3">
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
              onChange={(e) => setNopass(e.target.value)}
              // removed required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="days">
              Number of days <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="days"
              placeholder="Enter days between 1 and 12"
              min="1"
              max="12"
              value={numofdays}
              onChange={(e) => setDys(e.target.value)}
              // removed required
            />
          </div>
        </div>

        <div className="form-row" style={{ marginTop: 10 }}>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="hotel">Hotel/Other</label>
            <select
              className="form-control"
              id="hotel"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
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

          <div className="form-group col-md-6 mb-3">
            <label htmlFor="trans">Transport</label>
            <select
              className="form-control"
              id="trans"
              value={transport}
              onChange={(e) => setTrans(e.target.value)}
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
        </div>

        <div className="form-row" style={{ marginTop: 10 }}>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="guide">Tour guide</label>
            <select
              className="form-control"
              id="guide"
              value={tourGuide}
              onChange={(e) => setGuide(e.target.value)}
            >
              <option value="with">with</option>
              <option value="without">without</option>
            </select>
          </div>

          <div className="form-group col-md-6 mb-3">
            <label htmlFor="totPrice">
              Total price(Rs) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="totPrice"
              placeholder="Enter total price here"
              value={totPrice}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              // removed required
            />
          </div>
        </div>

        <div className="form-row mt-4">
          <div className="form-group col-md-12">
            <Link to="/manage/AllPacks" className={myStyle.btnBack}>
              Back
            </Link>
            &nbsp;&nbsp;
            <button type="submit" className={myStyle.btnUpdate2}>
              Update Package
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
