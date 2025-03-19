import { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import ChatWindow from "../components/Dashboard/ChatWindow";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/"); // Redirect to login if no user found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Redirect to login after logout
  };

  return (
    <div className="flex h-screen">
      <Sidebar setSelectedChat={setSelectedChat} />
      <ChatWindow selectedChat={selectedChat} />

      {/* Profile & Logout */}
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        {user && <span className="text-white">Welcome, {user.name}</span>}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
