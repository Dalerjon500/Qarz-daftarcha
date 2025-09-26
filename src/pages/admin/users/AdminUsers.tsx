import useUsers from "../../../hooks/useUsers";

function AdminUsers() {
    const {users} = useUsers();
  return (
    <div className="admin-users">
        <div className="admin-product-header">
            <h1>User Management</h1>
            <div className="divider"></div>
        </div>
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody className="tbody-light">
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.roles.join(", ")}</td>
                        <td>
                            <select name="" id="" className="form-control">
                                <option value="ADMIN">ADMIN</option>
                                <option value="CHEF">CHEF</option>
                                <option value="WAITER">WAITER</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default AdminUsers