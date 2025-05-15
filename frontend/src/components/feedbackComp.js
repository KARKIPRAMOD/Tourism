import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "../style_sheets/feedBackComp.css";
import { Rating } from "@mui/material";

function FeedBackComp() {
  const [feedbacks, setFeedbacks] = useState([]);
  const URL = "http://localhost:8070/feedBack/all";

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const fetchFeedback = useCallback(async () => {
    try {
      const res = await axios.get(URL);
      const result = res.data;
      setFeedbacks(result);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  if (feedbacks.length === 0) {
    return <p>No feedbacks yet.</p>;
  }

  return (
    <div>
      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000}>
        {feedbacks.map((value, index) => (
          <div key={index} className="boxWrapper">
            <div className="profileInfo">
              <div className="profileWrapper">
                <div>
                  <img
                    src="https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg"
                    alt="profile"
                    className="profileImg"
                  />
                </div>

                <div className="name">{value.name}</div>
                <Rating defaultValue={value.rating} name="read-only" readOnly />
                <div style={{ fontWeight: "600" }}>{value.rating}.0</div>
              </div>
            </div>
            <div className="reviewMsg">
              <div
                style={{
                  fontWeight: "600",
                  fontFamily: "Delius",
                  fontSize: "24px",
                }}
              >
                {value.category}
              </div>
              <div>{value.feedbackText}</div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default FeedBackComp;
