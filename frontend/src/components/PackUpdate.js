import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

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
    let isMounted = true;

    axios.get(`http://localhost:8070/package/get/${id}`)
      .then(({ data }) => {
        if (isMounted && data) {
          setName(data.packName || "");
          setPackID(data.packID || "");
          setDesti(data.Destination || "");
          setDys(data.NumOfDays || "");
          setNopass(data.NumOfPassen || "");
          setHotel(data.Hotel || "");
          setTrans(data.Transport || "");
          setGuide(data.TourGuide || "");
          setPrice(data.TotPrice || "");
        }
      })
      .catch(() => alert("Failed to load package details. Please try again."));

    return () => { isMounted = false; };
  }, [id]);

  const updateData = (e) => {
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

    axios.patch(`http://localhost:8070/package/update/${id}`, updatePackage)
      .then((response) => {
        if (response.status === 200) {
          alert("Package successfully updated");
          history.push("/manage/AllPacks");
        } else {
          alert("Update failed. Please try again.");
        }
      })
      .catch(() => alert("Error updating package. Please try again."));
  };

  return (
    <div className="container my-5">
      <div className="card mx-auto" style={{ maxWidth: 700 }}>
        <div className="card-header bg-primary text-white text-center">
          <h4>Edit Package Details</h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateData}>
            {/* Package Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Package Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Package ID */}
            <div className="mb-3">
              <label htmlFor="packId" className="form-label">
                Package ID
              </label>
              <input
                type="text"
                id="packId"
                className="form-control"
                value={packId}
                onChange={(e) => setPackID(e.target.value)}
              />
            </div>

            {/* Destination */}
            <div className="mb-3">
              <label htmlFor="destination" className="form-label">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                className="form-control"
                value={destination}
                onChange={(e) => setDesti(e.target.value)}
              />
            </div>

            {/* Number of Passengers & Days */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nopass" className="form-label">
                  Number of Passengers
                </label>
                <input
                  type="number"
                  id="nopass"
                  className="form-control"
                  min="1"
                  max="15"
                  value={nopass}
                  onChange={(e) => setNopass(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="numofdays" className="form-label">
                  Number of Days
                </label>
                <input
                  type="number"
                  id="numofdays"
                  className="form-control"
                  min="1"
                  max="12"
                  value={numofdays}
                  onChange={(e) => setDys(e.target.value)}
                />
              </div>
            </div>

            {/* Hotel & Transport */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="hotel" className="form-label">
                  Hotel/Other
                </label>
                <select
                  id="hotel"
                  className="form-select"
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
              <div className="col-md-6 mb-3">
                <label htmlFor="transport" className="form-label">
                  Transport
                </label>
                <select
                  id="transport"
                  className="form-select"
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

            {/* Tour Guide & Total Price */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="tourGuide" className="form-label">
                  Tour Guide
                </label>
                <select
                  id="tourGuide"
                  className="form-select"
                  value={tourGuide}
                  onChange={(e) => setGuide(e.target.value)}
                >
                  <option value="with">With</option>
                  <option value="without">Without</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="totPrice" className="form-label">
                  Total Price (Rs)
                </label>
                <input
                  type="number"
                  id="totPrice"
                  className="form-control"
                  min="0"
                  step="0.01"
                  value={totPrice}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <Link to="/manage/AllPacks" className="btn btn-outline-secondary px-4">
                Back
              </Link>
              <button type="submit" className="btn btn-primary px-4">
                Update Package
              </button>
            </div>
          </form>
        </div>
      </div>
            </div>

  );
}
