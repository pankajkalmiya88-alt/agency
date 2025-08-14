import { Outlet } from "react-router-dom";

export default function MyRequirementLayout() {
  return (
    <div>
      <h1>My Req Module</h1>
      <Outlet />
    </div>
  );
}