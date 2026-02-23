import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Trash2, Edit, UserCheck } from "lucide-react";

function UserManagement() {
  const [users, setUsers] = useState(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    return storedUsers;
  });
  const [editingId, setEditingId] = useState(null);
  const [editRole, setEditRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteUser = (username) => {
    if (window.confirm(`Delete user "${username}"?`)) {
      const updatedUsers = users.filter((user) => user.username !== username);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const handleChangeRole = (username) => {
    const updatedUsers = users.map((user) =>
      user.username === username ? { ...user, role: editRole } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditingId(null);
    setEditRole("");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-white mb-6">👥 User Management</h1>

        {/* Search Bar */}
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
          <input
            type="text"
            placeholder="Search users by username or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 overflow-x-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Registered Users ({filteredUsers.length})</h2>
          
          {filteredUsers.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No users found</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-blue-400 font-semibold">Username</th>
                  <th className="px-4 py-3 text-left text-blue-400 font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-blue-400 font-semibold">Role</th>
                  <th className="px-4 py-3 text-left text-blue-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.username} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-4 py-4 text-white font-medium">{user.username}</td>
                    <td className="px-4 py-4 text-gray-300">{user.email || "N/A"}</td>
                    <td className="px-4 py-4">
                      {editingId === user.username ? (
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="px-3 py-1 rounded-lg bg-black/30 border border-blue-500 text-white text-sm"
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.role === "admin"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-green-500/20 text-green-300"
                          }`}
                        >
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 flex gap-3">
                      {editingId === user.username ? (
                        <button
                          onClick={() => {
                            setEditRole(user.role);
                            handleChangeRole(user.username);
                          }}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm transition"
                        >
                          <UserCheck size={16} />
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingId(user.username);
                            setEditRole(user.role);
                          }}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                        >
                          <Edit size={16} />
                          Change Role
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user.username)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-8 rounded-2xl border border-blue-400/30 shadow-2xl">
            <h3 className="text-gray-300 text-sm font-semibold uppercase">Total Users</h3>
            <div className="text-4xl font-bold text-blue-400 mt-3">{users.length}</div>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-8 rounded-2xl border border-red-400/30 shadow-2xl">
            <h3 className="text-gray-300 text-sm font-semibold uppercase">Admin Users</h3>
            <div className="text-4xl font-bold text-red-400 mt-3">
              {users.filter((u) => u.role === "admin").length}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UserManagement;
