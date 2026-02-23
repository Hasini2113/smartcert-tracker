import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, PlusCircle, LogOut, User, Users, Bell } from "lucide-react";

function DashboardLayout({ children }) {
  const location = useLocation();
  const role = localStorage.getItem("role");

  const linkClass = (path) =>
    `px-4 py-3 rounded-xl transition-all duration-300 ${
      location.pathname === path
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  const getPageTitle = () => {
    if (location.pathname === "/user/dashboard") return "Dashboard";
    if (location.pathname === "/user/certifications") return "My Certifications";
    if (location.pathname === "/user/add") return "Add Certification";
    if (location.pathname.includes("user/edit")) return "Edit Certification";
    if (location.pathname.includes("user/renew")) return "Renew Certification";
    if (location.pathname === "/notifications") return "Notifications";
    if (location.pathname === "/admin/dashboard") return "Admin Dashboard";
    if (location.pathname === "/admin/users") return "User Management";
    if (location.pathname === "/admin/certifications") return "Manage Certifications";
    if (location.pathname === "/profile") return "Profile";
    return "";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* Sidebar */}
      <div className="w-64 bg-black/40 backdrop-blur-xl p-6 space-y-8 shadow-2xl border-r border-gray-700">

        <h2 className="text-2xl font-bold text-blue-400 tracking-wide">
          CertTracker 🚀
        </h2>

        <nav className="flex flex-col space-y-4">

          {/* USER MENU */}
          {role === "user" && (
            <>
              <Link
                to="/user/dashboard"
                className={linkClass("/user/dashboard")}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={18} />
                  Dashboard
                </div>
              </Link>

              <Link
                to="/user/certifications"
                className={linkClass("/user/certifications")}
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} />
                  My Certifications
                </div>
              </Link>
               <Link
  to="/profile"
  className={linkClass("/profile")}
>
  <div className="flex items-center gap-3">
    <User size={18} />
    Profile
  </div>
</Link>

              <Link
                to="/notifications"
                className={linkClass("/notifications")}
              >
                <div className="flex items-center gap-3">
                  <Bell size={18} />
                  Notifications
                </div>
              </Link>

              <Link
                to="/user/add"
                className={linkClass("/user/add")}
              >
                <div className="flex items-center gap-3">
                  <PlusCircle size={18} />
                  Add Certification
                </div>
              </Link>
            </>
          )}

          {/* ADMIN MENU */}
          {role === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                className={linkClass("/admin/dashboard")}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={18} />
                  Admin Dashboard
                </div>
              </Link>
              
              <Link
                to="/admin/users"
                className={linkClass("/admin/users")}
              >
                <div className="flex items-center gap-3">
                  <Users size={18} />
                  Manage Users
                </div>
              </Link>
              
              <Link
                to="/admin/certifications"
                className={linkClass("/admin/certifications")}
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} />
                  Manage Certs
                </div>
              </Link>

              <Link
                to="/profile"
                className={linkClass("/profile")}
              >
                <div className="flex items-center gap-3">
                  <User size={18} />
                  Profile
                </div>
              </Link>
            </>
          )}

        </nav>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <div className="flex justify-between items-center px-10 py-4 border-b border-gray-700 bg-black/30 backdrop-blur-xl">

          <h1 className="text-2xl font-semibold text-gray-200">
            {getPageTitle()}
          </h1>

          <div className="flex items-center gap-4">

            {/* Notification Bell (User only) */}
            {role === "user" && (
              <Link
                to="/notifications"
                className="relative text-gray-300 hover:text-blue-400 transition"
              >
                <Bell size={24} />
              </Link>
            )}

            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              {role === "admin" ? "A" : "U"}
            </div>

            {/* Logout */}
            <button
              onClick={() => {
                localStorage.removeItem("role");
                window.location.href = "/";
              }}
              className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

        {/* Page Content */}
        <div className="flex-1 p-10 animate-fadeIn">
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;