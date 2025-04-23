import React from "react";

const ThingsToDo = (props) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "160px",
        marginBottom: "2rem",
        borderRadius: "4px",
      }}
    >
      <div>
        <img
          src={props.image}
          alt={props.alt}
          style={{
            width: "100%",
            objectFit: "cover",
            borderRadius: "4px 4px 0px 0px",
            height: "150px",
          }}
        />
      </div>
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          fontFamily: "poppins",
          fontSize: "14px",
        }}
      >
        {props.name}
      </div>
    </div>
  );
};

export default ThingsToDo;
