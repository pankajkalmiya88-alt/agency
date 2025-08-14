import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav style={{ padding: "10px", background: "#ddd" }}>
      <Link to="/new-requirement/list" style={{ marginRight: "10px" }}>New Requirements</Link>
      <Link to="/my-requirement/list" style={{ marginRight: "10px" }}>My Requirements</Link>
      <Link to="/settings/my-account" style={{ marginRight: "10px" }}>Settings</Link>
      <Link to="/login">Logout</Link>
    </nav>
  );
}