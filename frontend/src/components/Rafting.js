function Rafting() {
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <iframe
        width="100%"
        height="664px"
        src="https://www.youtube.com/embed/-LmwbcD40uA?si=fhFieR8NERC02FSS"
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
          Rafting In Nepal
        </div>

        <div
          style={{
            paddingTop: "20px",
            fontWeight: "600",
            fontSize: "24px",
            color: "rgb(6, 100, 199)",
          }}
        >
          Adventure through the roaring rivers of Nepal!
        </div>

        <p style={{ paddingTop: "15px", fontSize: "16px", lineHeight: "1.6" }}>
          Rafting in Nepal is one of the most thrilling adventures, offering a
          perfect blend of adrenaline and natural beauty. Nepal’s rivers, fed by
          Himalayan glaciers, provide some of the best whitewater experiences in
          the world.
        </p>

        <ol
          style={{
            fontSize: "16px",
            lineHeight: "1.8",
          }}
        >
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Popular Rivers
            </div>
            Try rafting in the Trishuli, Seti, Bhote Koshi, Kali Gandaki, and
            Sun Koshi rivers — each offering unique rapids and scenic beauty.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Equipment and Safety
            </div>
            Professional rafting companies provide helmets, life jackets, and
            expert guides to ensure your safety on the rapids.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>Best Time</div>
            The ideal seasons are spring (March-May) and autumn
            (September-November) when river levels are perfect for both
            beginners and experienced rafters.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>Permits</div>
            In most cases, rafting companies will handle permits and logistics
            for you. However, check if any specific area needs a special permit.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Rafting;
