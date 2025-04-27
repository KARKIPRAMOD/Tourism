function MountainBiking() {
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <iframe
        width="100%"
        height="664px"
        src="https://www.youtube.com/embed/AWMmTf9tG7U?si=rO0KcxUiSiRn4dGn"
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
          Mountain Biking In Nepal
        </div>

        <div
          style={{
            paddingTop: "20px",
            fontWeight: "600",
            fontSize: "24px",
            color: "rgb(6, 100, 199)",
          }}
        >
          Explore rugged trails and hidden valleys on two wheels!
        </div>

        <p style={{ paddingTop: "15px", fontSize: "16px", lineHeight: "1.6" }}>
          Nepal is a paradise for mountain biking enthusiasts, offering trails
          through lush forests, traditional villages, and dramatic landscapes.
          Whether you're riding downhill tracks or uphill Himalayan passes, it’s
          a thrilling way to experience the beauty of Nepal.
        </p>

        <ol
          style={{
            fontSize: "16px",
            lineHeight: "1.8",
          }}
        >
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Popular Mountain Biking Routes
            </div>
            Kathmandu Valley Rim, Pokhara to Jomsom, Annapurna Circuit, Lower
            Mustang trails.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Types of Rides
            </div>
            Options range from cross-country trails to technical downhill
            descents, suitable for all skill levels.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Equipment and Rentals
            </div>
            Mountain bikes, helmets, gloves, and protective gear can be rented
            in major cities like Kathmandu and Pokhara.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Best Season
            </div>
            The best time for mountain biking is during spring (March-May) and
            autumn (September-November) when the weather is clear and dry.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default MountainBiking;
