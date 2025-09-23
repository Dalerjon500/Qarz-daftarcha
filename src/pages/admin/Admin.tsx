import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar';

function Admin() {
  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin