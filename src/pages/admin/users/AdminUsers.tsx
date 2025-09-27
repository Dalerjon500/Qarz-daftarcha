import { useState } from "react";
import { FaSave, FaUser, FaTimes, FaUserShield, FaUtensils, FaConciergeBell } from "react-icons/fa";
import useUsers from "../../../hooks/useUsers";

function AdminUsers() {
  const { users, updateUserRole } = useUsers();
  const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: string[] }>({});
  const [isSaving, setIsSaving] = useState<{ [key: string]: boolean }>({});

  const handleRoleChange = (userId: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedRoles((prev) => ({ ...prev, [userId]: selected }));
  };

  const saveRoleChange = async (userId: string) => {
    const roles = selectedRoles[userId] ?? [];

    setIsSaving((prev) => ({ ...prev, [userId]: true }));
    try {
      await updateUserRole(userId, roles);
    } finally {
      setIsSaving((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      ADMIN: { color: "danger", icon: <FaUserShield className="me-1" /> },
      CHEF: { color: "warning", icon: <FaUtensils className="me-1" /> },
      WAITER: { color: "info", icon: <FaConciergeBell className="me-1" /> }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || { color: "secondary", icon: <FaUser className="me-1" /> };
    
    return (
      <span className={`badge bg-soft-${config.color} text-${config.color} p-2 me-1 mb-1 d-inline-flex align-items-center`}>
        {config.icon}
        {role}
      </span>
    );
  };

  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <h2 className="fw-bold text-center text-gradient text-primary">
          <FaUser className=" w-100 me-2" />
          User Management
        </h2>
        <p className="text-muted">Manage user roles and permissions</p>
      </div>
      
      <div className="card shadow-soft border-0 rounded-3 overflow-hidden">
        <div className="card-header bg-soft-primary border-0 py-3">
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-soft-secondary">
                <tr>
                  <th className="ps-4 py-3 fw-semibold text-dark border-0">User Information</th>
                  <th className="py-3 fw-semibold text-dark border-0" style={{ width: "250px" }}>Current Roles</th>
                  <th className="py-3 fw-semibold text-dark border-0" style={{ width: "250px" }}>Assign New Roles</th>
                  <th className="pe-4 py-3 fw-semibold text-dark border-0 text-end" style={{ width: "200px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  const currentRoles = selectedRoles[user.id] ?? user.roles ?? [];
                  return (
                    <tr key={user.id} className={index % 2 === 0 ? 'bg-soft-light' : ''}>
                      <td className="ps-4 py-3 border-0">
                        <div className="d-flex align-items-center">
                          <div className="bg-soft-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                               style={{ width: '45px', height: '45px' }}>
                            <FaUser className="text-primary" size={18} />
                          </div>
                          <div>
                            <div className="fw-semibold text-dark">{user.name}</div>
                            <small className="text-muted">{user.email}</small>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 border-0">
                        <div className="d-flex flex-wrap">
                          {user.roles?.map(role => getRoleBadge(role))}
                          {(!user.roles || user.roles.length === 0) && (
                            <span className="badge bg-soft-secondary text-secondary p-2">No roles assigned</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 border-0">
                        <select
                          multiple
                          className="form-select border-soft shadow-soft"
                          size={3}
                          value={currentRoles}
                          onChange={(e) => handleRoleChange(user.id, e)}
                          style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
                        >
                          <option value="ADMIN" className="text-danger fw-semibold">ADMIN</option>
                          <option value="CHEF" className="text-warning fw-semibold">CHEF</option>
                          <option value="WAITER" className="text-info fw-semibold">WAITER</option>
                        </select>
                      </td>
                      <td className="pe-4 py-3 border-0 text-end">
                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            className="btn btn-soft-success btn-sm d-flex align-items-center gap-1 px-3 py-2"
                            onClick={() => saveRoleChange(user.id)}
                            disabled={isSaving[user.id]}
                            style={{ borderRadius: '6px', transition: 'all 0.3s' }}
                          >
                            {isSaving[user.id] ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Saving...
                              </>
                            ) : (
                              <>
                                <FaSave /> Save
                              </>
                            )}
                          </button>
                          <button 
                            className="btn btn-soft-danger btn-sm d-flex align-items-center gap-1 px-3 py-2"
                            style={{ borderRadius: '6px', transition: 'all 0.3s' }}
                          >
                            <FaTimes /> Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;