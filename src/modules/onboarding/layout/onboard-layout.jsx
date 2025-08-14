import { Outlet } from "react-router-dom";

export default function OnboardLayout() {
  return (
    <div>
      <h1>Onboarding Module</h1>
      <Outlet />
    </div>
  );
}