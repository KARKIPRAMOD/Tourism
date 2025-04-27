function Trekking() {
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <iframe
        width="100%"
        height="664px"
        src="https://www.youtube.com/embed/I2I4EySGYEU?autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
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
          Trekking In Nepal
        </div>

        <div
          style={{
            paddingTop: "20px",
            fontWeight: "600",
            fontSize: "24px",
            color: "rgb(6, 100, 199)",
          }}
        >
          Permits required while trekking in Nepal
        </div>

        <p style={{ paddingTop: "15px", fontSize: "16px", lineHeight: "1.6" }}>
          The following permits are required to trek in Nepal. You will need to
          provide various documents, including proof of travel insurance, a
          photocopy of your passport and two passport-sized photos.
        </p>

        <ol
          style={{
            fontSize: "16px",
            lineHeight: "1.8",
          }}
        >
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Trekkers’ Information Management System (TIMS) permit
            </div>
            designed so Nepal's government can keep a record of trekkers and
            respond to emergencies.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              National Park permits
            </div>
            for trekking in 12 various national parks in Nepal, including
            Sagarmatha, Makalu, and Langtang National Parks.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Conservation Area permits
            </div>
            for trekking in six different conservation areas, including the
            Annapurna, Kanchenjunga, and Manaslu Conservation Areas.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Restricted Area Permits (RAP)
            </div>
            It is compulsory to have a trekking guide to trek these areas which
            includes the remote area of Upper Dolpa, Mustang and Manaslu. Take a
            look at the full list of fees for the Conservation area and National
            park permits in Nepal.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Trekking;
