import { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./Profile";
import PackageCard from "./PackageCard";
import PackageReservation from "./PackageReservation";

const ReservedPackages = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const [packages, setPackages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userId) return;

    // Fetch user data
    axios
      .get(`http://localhost:8070/user/${userId}`)
      .then((res) => setUserData(res.data.user))
      .catch(() => setError("Failed to load user data"));

    // Fetch reservations
    axios
      .get(`http://localhost:8070/reservePackageRouter/reservations/${userId}`)
      .then((res) => {
        const reservations = res.data;
        setReservations(reservations || []);

        const packageRequests = reservations.map((reservation) => {
          const packageId =
            typeof reservation.package === "object"
              ? reservation.package._id
              : reservation.package;
          console.log(packageId);
          return axios
            .get(`http://localhost:8070/package/get/${packageId}`)
            .then((pkgRes) => ({
              packageId,
              data: pkgRes.data,
            }))
            .catch((err) => {
              console.error("Error fetching package:", err);
              return null;
            });
        });

        Promise.all(packageRequests).then((results) => {
          const details = {};
          results.forEach((res) => {
            console.log(res);
            if (res) {
              console.log("Adding to details:", res.packageId, res);
              details[res.packageId] = res.data;
            }
          });
          console.log("Response", details);
          setPackages(details);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error("Error fetching reservations:", err);
        setError("Failed to load reserved packages");
        setLoading(false);
      });
  }, [userId]);

  console.log(reservations);
  if (!userId) {
    return <div>Please log in to see your reserved packages.</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
        <ProfileSidebar userData={userData} userId={userId} />
        <main style={{ flexGrow: 1, padding: "20px" , marginLeft:"320px"}}>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <p>Loading reserved packages...</p>
        ) : reservations.length === 0 ? (
          <p>No reserved packages found.</p>
        ) : (
          <div>
           <h2
            style={{
              
              color: "#007bff", // Blue color for the title
              fontWeight: "600",
              textAlign: "center", // Center the title
              width: "fit-content", // Make the box width fit the content
              margin: "0 auto", // Center the box horizontally
              marginBottom: "30px", 
            }}
          >Your Reserved Packages</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {reservations.length === 0 ? (
                <div>No package booked</div>
              ) : (
                reservations?.map((reservation) => {
                  const packageId =
                    typeof reservation.package === "object"
                      ? reservation.package._id
                      : reservation.package;

                  const pkg = packages[packageId];
                  console.log(pkg);
                  return (
                    <PackageReservation
                      key={reservation._id}
                      pkg={pkg}
                      reservation={reservation}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReservedPackages;
