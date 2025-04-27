function Zipflying() {
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <iframe
        width="100%"
        height="664px"
        src="https://www.youtube.com/embed/fJX2crBJlp4?autoplay=1"
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
          ZipFlying In Nepal
        </div>

        <div
          style={{
            paddingTop: "20px",
            fontWeight: "600",
            fontSize: "24px",
            color: "rgb(6, 100, 199)",
          }}
        >
          Experience the thrill of ZipFlying!
        </div>

        <p style={{ paddingTop: "15px", fontSize: "16px", lineHeight: "1.6" }}>
          ZipFlying in Nepal offers an adrenaline-pumping experience across some
          of the most stunning landscapes. Glide over valleys and rivers with
          breathtaking views of the Himalayas. Popular destinations for
          ZipFlying include Pokhara, which hosts one of the world's longest and
          steepest ziplines.
        </p>

        <ol
          style={{
            fontSize: "16px",
            lineHeight: "1.8",
          }}
        >
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>Location</div>
            Pokhara is the most famous location for ZipFlying, offering stunning
            views of Annapurna and Machhapuchhre ranges.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Requirements
            </div>
            Participants must meet weight and health requirements for safety.
            Generally, weight limits range between 35 kg to 125 kg.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Safety Measures
            </div>
            All rides are conducted with international safety standards, using
            certified harnesses, helmets, and equipment.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>Best Time</div>
            The best seasons for ZipFlying are spring (March-May) and autumn
            (September-November) for clear skies and fantastic views.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Zipflying;
