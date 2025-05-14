import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/AuthStore";
import { toast } from "react-toastify";

function UserList() {
  const [users, setUsers] = useState([]);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user and their blogs?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User Deleted");
    } catch (error) {
      /* console.error("Failed to delete user:", error); */
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#328E6E] mb-6">👥 User List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#328E6E] rounded-xl bg-white text-gray-800">
          <thead className="bg-[#328E6E] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Full Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-[#d5e5ab]">
                <td className="px-4 py-3">{user?.fullName}</td>
                <td className="px-4 py-3">{user?.email}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 bg-[#EB5A3C] text-white rounded-md hover:bg-[#cf462a] transition"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
