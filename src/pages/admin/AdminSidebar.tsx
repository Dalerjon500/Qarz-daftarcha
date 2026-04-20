import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <NavLink to="/admin">Admin</NavLink>
      <NavLink to="/">Home</NavLink>
    </aside>
  );
}

export default AdminSidebar;
