// import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";

// function getCookie(name: any) {
//   const value = `; ${document.cookie}`;
//   const parts: any = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// }

// function App() {
//   const [email, setEmail] = useState(null);

//   useEffect(() => {
//     const userEmail = getCookie("userEmail"); // cookie name "userEmail"
//     setEmail(userEmail);
//   }, []);

//   return (
//     <div style={{ maxWidth: 300, margin: "auto", padding: 20 }}>
//        <h2>Agency</h2>
//       <h2>Saved Email from Cookie</h2>
//       {email ? (
//         <p>Email: <strong>{email}</strong></p>
//       ) : (
//         <p>No email cookie found.</p>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react"; 
import { loaderHandler } from "./api/loaderHandler";
import AppRoutes from "./routes";
import Loader from "./components/Loader";
export default function App() {
const [loading, setLoading] = useState(false);

   useEffect(() => {
    loaderHandler.init(setLoading); // Allow interceptors to control loader
  }, []);
  return (
    <>
    {loading && <Loader />}
    <AppRoutes />
    </>
  );
}
