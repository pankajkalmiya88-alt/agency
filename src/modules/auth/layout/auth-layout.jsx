import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <h1>Auth Module</h1>
      <Outlet />
    </div>
  );
}