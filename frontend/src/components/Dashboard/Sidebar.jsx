import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://sytemicaltruism-backend.onrender.com");

const Sidebar = ({ setSelectedChat }) => {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) return;

    // Fetch users from database
    const fetchUsers = async () => {
      try {
        console.log("Fetching users for:", loggedInUser.id);
        const res = await axios.get(
          `http://localhost:5000/api/users/${loggedInUser.id}`
        );
        console.log("Users fetched:", res.data);
        setUsers(res.data);
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
      }
    };

    fetchUsers();

    // Register user as online
    socket.emit("userOnline", loggedInUser.id);

    socket.on("updateOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("updateOnlineUsers");
    };
  }, []);

  return (
    <div className="w-1/4 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <div className="space-y-2">
        {users.length === 0 ? (
          <p className="text-gray-400 text-center">No users found.</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
              onClick={() => setSelectedChat(user)}>
              <div className="flex items-center">
                <span
                  className={`w-3 h-3 rounded-full mr-2 ${
                    onlineUsers.includes(user._id)
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}></span>
                <span>{user.name}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
