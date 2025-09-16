import useContextPro from "../hooks/useContextPro"

function UserList() {
    const { state: { users }, dispatch} = useContextPro()

  return (
    <div className="min-w-full p-8 ">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <button onClick={() => dispatch({ type: "ADD_USER" })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Add User</button>
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-50 ">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap border">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap border">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap border">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap border">
                            <button 
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default UserList