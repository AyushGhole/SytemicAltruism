import { useState } from "react";
import { signup } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Signup = ({ toggleAuth }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signup({ name, email, password });

    if (res.error) {
      setError(res.error);
    } else {
      navigate("/"); // Redirect to login after signup
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold text-center">
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSignup} className="mt-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-3"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-3"
          />
          <button className="w-full bg-green-500 p-2 rounded text-white hover:bg-green-600">
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <span className="text-blue-400 cursor-pointer" onClick={toggleAuth}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
