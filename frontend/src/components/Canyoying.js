function Canyoying() {
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <iframe
        width="100%"
        height="664px"
        src="https://www.youtube.com/embed/ZXkWdygkJJE?si=wltMrRWyAn2HlSE2"
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
          Canyoning In Nepal
        </div>

        <div
          style={{
            paddingTop: "20px",
            fontWeight: "600",
            fontSize: "24px",
            color: "rgb(6, 100, 199)",
          }}
        >
          Dive into Nepal’s hidden waterfalls and rugged canyons!
        </div>

        <p style={{ paddingTop: "15px", fontSize: "16px", lineHeight: "1.6" }}>
          Canyoning in Nepal offers the ultimate experience of rappelling,
          sliding, jumping, and swimming through narrow canyons and cascading
          waterfalls. It’s an adventure sport perfect for thrill-seekers wanting
          to explore nature from a whole new angle.
        </p>

        <ol
          style={{
            fontSize: "16px",
            lineHeight: "1.8",
          }}
        >
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Popular Canyoning Spots
            </div>
            Some of the best places include Jalbire Canyon (Chitwan), Panglang,
            Kakani, and Bhotekoshi area.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Equipment and Safety
            </div>
            Wetsuits, harnesses, helmets, and ropes are provided by professional
            canyoning companies to ensure your safety.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>Best Time</div>
            March to May and September to November are considered the best
            seasons for canyoning adventures.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>Permits</div>
            Most canyoning trips are organized by licensed adventure companies,
            handling permits and insurance for you.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Canyoying;
