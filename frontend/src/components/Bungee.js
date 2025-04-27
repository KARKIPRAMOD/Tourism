function Bungee() {
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <iframe
        width="100%"
        height="664px"
        src="https://www.youtube.com/embed/igLbLFolQsA?si=8oumehJSTQxTY08n?autoplay=1"
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
          Bungee Jumping In Nepal
        </div>

        <div
          style={{
            paddingTop: "20px",
            fontWeight: "600",
            fontSize: "24px",
            color: "rgb(6, 100, 199)",
          }}
        >
          Take the leap of a lifetime!
        </div>

        <p style={{ paddingTop: "15px", fontSize: "16px", lineHeight: "1.6" }}>
          Bungee Jumping in Nepal is an adrenaline-filled adventure that
          attracts thrill-seekers from around the world. Leap off suspension
          bridges or high towers with breathtaking river gorges and valleys
          below. It’s the ultimate free-fall experience in nature's lap.
        </p>

        <ol
          style={{
            fontSize: "16px",
            lineHeight: "1.8",
          }}
        >
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>Locations</div>
            The most famous bungee spots are The Last Resort near the Bhote
            Koshi River and the new adventure hubs near Pokhara.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Requirements
            </div>
            Participants should be at least 18 years old (or have parental
            consent) and should meet health and weight guidelines (usually
            40kg-100kg).
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Safety Measures
            </div>
            Certified jump masters and high-quality equipment ensure maximum
            safety, following international bungee standards.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>Best Time</div>
            Best seasons for bungee are spring and autumn for stable weather and
            clear views.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Bungee;
