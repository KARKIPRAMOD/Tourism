function Skydiving() {
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <iframe
        width="100%"
        height="664px"
        src="https://www.youtube.com/embed/7PN9nRxW9qo?si=WVhHBRujqSwSBRG-&amp;controls=0"
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
          SkyDiving In Nepal
        </div>

        <div
          style={{
            paddingTop: "20px",
            fontWeight: "600",
            fontSize: "24px",
            color: "rgb(6, 100, 199)",
          }}
        >
          Soar above the Himalayas!
        </div>

        <p style={{ paddingTop: "15px", fontSize: "16px", lineHeight: "1.6" }}>
          SkyDiving in Nepal offers a once-in-a-lifetime experience: jumping out
          of an aircraft with the mighty Everest or Annapurna ranges as your
          backdrop. It's one of the most exhilarating adventures you can
          experience on the planet!
        </p>

        <ol
          style={{
            fontSize: "16px",
            lineHeight: "1.8",
          }}
        >
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>Locations</div>
            The most popular locations are Everest region (world’s highest drop
            zone) and Pokhara valley with stunning lake and mountain views.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Requirements
            </div>
            No prior experience needed! Tandem skydives are available for
            beginners with basic health and fitness requirements.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Safety Standards
            </div>
            Skydives are conducted by professional international instructors
            with top-grade equipment and strict safety protocols.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>Best Time</div>
            Best seasons are autumn (October–November) and spring (March–May)
            when weather is clear for amazing mountain views.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Skydiving;
