// src/components/Loader.js
import React from "react";

export default function Loader() {
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}>
      <div style={{
        padding: "20px",
        background: "white",
        borderRadius: "10px"
      }}>
        Loading...
      </div>
    </div>
  );
}