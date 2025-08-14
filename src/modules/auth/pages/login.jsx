import React, { useEffect, useState } from "react";
import userApi from "../../../services/userApi";

export default function Login() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    userApi.get("/todos")
      .then(res => {
        if (isMounted) setUsers(res);
      })
      .catch(console.error);

    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    console.log("users:", users);
  }, [users]);


  return <div>Login Page</div>;
}