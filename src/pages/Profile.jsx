import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function Profile() {
  const role = localStorage.getItem("role");

  const [profile, setProfile] = useState({
    fullName: "",
    nickname: "",
    profession: "",
    bio: "",
    password: "",
    profilePic: "",
  });

  useEffect(() => {
    const savedProfile =
      JSON.parse(localStorage.getItem("profile")) || {};
    setProfile(savedProfile);
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile({
        ...profile,
        profilePic: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile Updated Successfully 🎉");
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-10 text-white">
        My Profile 👤
      </h1>

      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/10 max-w-3xl">

        <form onSubmit={handleSave} className="space-y-8">

          {/* Profile Picture */}
          <div className="flex items-center gap-6">

            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
              {profile.profilePic ? (
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-3xl">
                  {role === "admin" ? "A" : "U"}
                </div>
              )}
            </div>

            <label className="cursor-pointer bg-gray-800 px-6 py-3 rounded-xl border border-gray-600 hover:border-blue-500 transition">
              Change Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

          </div>

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3"
          />

          {/* Nickname */}
          <input
            type="text"
            name="nickname"
            placeholder="Nickname"
            value={profile.nickname}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3"
          />

          {/* Profession / Studying */}
          <input
            type="text"
            name="profession"
            placeholder="Studying / Profession"
            value={profile.profession}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3"
          />

          {/* Bio */}
          <textarea
            name="bio"
            placeholder="Short Bio..."
            value={profile.bio}
            onChange={handleChange}
            rows="3"
            className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3"
          />

          {/* Change Password */}
          <input
            type="password"
            name="password"
            placeholder="Change Password"
            value={profile.password}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3"
          />

          {/* Role Badge */}
          <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-xl text-center font-semibold">
            Role: {role?.toUpperCase()}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
          >
            Save Changes
          </button>

        </form>

      </div>
    </DashboardLayout>
  );
}

export default Profile;