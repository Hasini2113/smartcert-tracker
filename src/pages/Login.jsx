import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Check for admin credentials
    if (username === "admin" && password === "admin@123") {
      localStorage.setItem("role", "admin");
      window.location.href = "/admin/dashboard";
      return;
    }

    // Check for regular user
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("role", "user");
      window.location.href = "/user/dashboard";
    } else {
      setError("Invalid Username or Password ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/10 w-96">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Login 🔐
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
          >
            Login
          </button>

        </form>

        {/* Register Link */}
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

        {/* Back to Home */}
        <p className="text-center text-gray-400 mt-4">
          <span
            className="text-blue-400 cursor-pointer hover:underline text-sm"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;