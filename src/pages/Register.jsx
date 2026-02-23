import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    // Prevent registering with admin username
    if (formData.username.toLowerCase() === "admin") {
      setError("Username 'admin' is reserved ❌");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    if (existingUsers.some((u) => u.username === formData.username)) {
      setError("Username already exists ❌");
      return;
    }

    // Add role as 'user' automatically
    existingUsers.push({ ...formData, role: "user" });
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("User Registered Successfully 🎉");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/10 w-96">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Register 📝
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3"
          />

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold"
          >
            Register
          </button>

        </form>

      </div>
    </div>
  );
}

export default Register;