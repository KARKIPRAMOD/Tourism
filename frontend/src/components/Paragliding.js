function Paragliding() {
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <iframe
        width="100%"
        height="664px"
        src="https://www.youtube.com/embed/B6OcxzcAP58?si=YBvHgmJ4OOlzxZJH"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <div
        style={{
          margin: "5rem auto",
          maxWidth: "800px",
        }}
      >
        <div
          style={{
            fontWeight: "700",
            fontSize: "32px",
            color: "rgb(68, 104, 226)",
          }}
        >
          Paragliding In Nepal
        </div>

        <div
          style={{
            paddingTop: "20px",
            fontWeight: "600",
            fontSize: "24px",
            color: "rgb(6, 100, 199)",
          }}
        >
          Soar above mountains and lakes for breathtaking views!
        </div>

        <p style={{ paddingTop: "15px", fontSize: "16px", lineHeight: "1.6" }}>
          Paragliding in Nepal offers one of the best aerial experiences in the
          world. With the majestic Himalayas as your backdrop and serene lakes
          below, you can enjoy an unforgettable flight with experienced pilots.
        </p>

        <ol
          style={{
            fontSize: "16px",
            lineHeight: "1.8",
          }}
        >
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Popular Paragliding Spots
            </div>
            Pokhara (Sarangkot), Bandipur, and Sirkot are famous take-off points
            with stunning views.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Tandem Flights
            </div>
            Most flights are tandem, meaning you fly with a certified pilot — no
            experience needed!
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Best Time To Fly
            </div>
            October to April offers the best flying conditions with clear skies
            and stable thermals.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Safety and Regulations
            </div>
            Licensed pilots and strict safety protocols ensure a secure and
            thrilling flight experience.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Paragliding;
