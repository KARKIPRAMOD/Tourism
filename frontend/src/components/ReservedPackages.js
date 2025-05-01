import { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./Profile";
import PackageCard from "./PackageCard";

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
      .get(`http://localhost:8070/package/all`)
      .then((res) => {
        const reservations = res.data.existingPackages;
        setReservations(reservations);

        const packageRequests = reservations.map((reservation) => {
          const packageId =
            typeof reservation.package === "object"
              ? reservation.package._id
              : reservation.package;

          return axios
            .get(`http://localhost:8070/package/${packageId}`)
            .then((pkgRes) => ({
              packageId,
              data: pkgRes.data.package,
            }))
            .catch((err) => {
              console.error("Error fetching package:", err);
              return null;
            });
        });

        Promise.all(packageRequests).then((results) => {
          const details = {};
          results.forEach((res) => {
            if (res) {
              details[res.packageId] = res.data;
            }
          });
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
      <main style={{ flexGrow: 1, padding: "20px" }}>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <p>Loading reserved packages...</p>
        ) : reservations.length === 0 ? (
          <p>No reserved packages found.</p>
        ) : (
          <div>
            <h3>Your Reserved Packages</h3>
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
                  return (
                    <PackageCard
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
