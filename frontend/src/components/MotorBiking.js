function MotorBiking() {
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <iframe
        width="100%"
        height="664px"
        src="https://www.youtube.com/embed/hHkad5cXGXI?si=T-mo9yGSnsVZQDRr>autoplay=1"
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
          Motor Biking In Nepal
        </div>

        <div
          style={{
            paddingTop: "20px",
            fontWeight: "600",
            fontSize: "24px",
            color: "rgb(6, 100, 199)",
          }}
        >
          Ride through the rugged beauty of Nepal!
        </div>

        <p style={{ paddingTop: "15px", fontSize: "16px", lineHeight: "1.6" }}>
          Motorbiking in Nepal offers an epic adventure across stunning
          landscapes — from the chaotic city streets of Kathmandu to the serene
          beauty of Mustang and the rugged trails of the Himalayas. It's the
          perfect way to explore the hidden gems of Nepal at your own pace.
        </p>

        <ol
          style={{
            fontSize: "16px",
            lineHeight: "1.8",
          }}
        >
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Popular Routes
            </div>
            Ride to Mustang, Manang, Pokhara, and even to the Everest region
            base areas! Each route offers its own challenges and breathtaking
            views.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              License & Permits
            </div>
            A valid international driving license and permits for restricted
            areas are necessary for long rides in remote regions.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Bike Rentals
            </div>
            Bikes such as Royal Enfield, dirt bikes, and Himalayan tours bikes
            are easily available for rent in Kathmandu and Pokhara.
          </li>
          <br />
          <li>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>Best Time</div>
            Best seasons for motorbiking are pre-monsoon (March-May) and
            post-monsoon (September-November) for clear skies and dry trails.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default MotorBiking;
