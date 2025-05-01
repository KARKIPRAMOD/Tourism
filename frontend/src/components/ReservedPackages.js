import { useEffect, useState } from "react";
import ProfileSidebar from "./Profile";
import axios from "axios";

function ReservedPackages({ userId }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8070/user/${userId}`)
      .then((res) => setUserData(res.data.user))
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      });
  }, [userId]);
  console.log(userId);
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ProfileSidebar userData={userData} userId={userId} />
      Reserved Packages
    </div>
  );
}

export default ReservedPackages;
