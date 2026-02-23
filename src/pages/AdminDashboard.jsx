import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { Users, FileText, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCerts: 0, expiredCerts: 0 });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const certs = JSON.parse(localStorage.getItem("userCertifications")) || [];
    
    const today = new Date();
    const expiredCount = certs.filter(cert => new Date(cert.expiryDate) < today).length;
    
    setStats({
      totalUsers: users.length,
      totalCerts: certs.length + 1, // +1 for demo cert
      expiredCerts: expiredCount
    });
  }, []);

  const adminCards = [
    {
      title: "👥 User Management",
      description: "View, edit roles, and delete users",
      icon: Users,
      link: "/admin/users",
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-400/30"
    },
    {
      title: "📜 Manage Certifications",
      description: "Filter, approve, and manage all certificates",
      icon: FileText,
      link: "/admin/certifications",
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-400/30"
    },
    {
      title: "📊 Analytics",
      description: "View system statistics and reports",
      icon: BarChart3,
      link: "/admin/analytics",
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-400/30"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-12">
        <h1 className="text-4xl font-bold text-white">Admin Dashboard 👑</h1>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-8 rounded-2xl border border-blue-400/30 shadow-2xl hover:shadow-blue-500/20 transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-300 text-sm font-semibold uppercase">Total Users</h3>
                <div className="text-4xl font-bold text-blue-400 mt-3">{stats.totalUsers}</div>
              </div>
              <Users size={40} className="text-blue-400/50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-8 rounded-2xl border border-purple-400/30 shadow-2xl hover:shadow-purple-500/20 transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-300 text-sm font-semibold uppercase">Total Certificates</h3>
                <div className="text-4xl font-bold text-purple-400 mt-3">{stats.totalCerts}</div>
              </div>
              <FileText size={40} className="text-purple-400/50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-8 rounded-2xl border border-red-400/30 shadow-2xl hover:shadow-red-500/20 transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-300 text-sm font-semibold uppercase">Expired Certificates</h3>
                <div className="text-4xl font-bold text-red-400 mt-3">{stats.expiredCerts}</div>
              </div>
              <BarChart3 size={40} className="text-red-400/50" />
            </div>
          </div>
        </div>

        {/* Admin Features */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Admin Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {adminCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.link}
                  to={card.link}
                  className={`bg-gradient-to-br ${card.color} p-8 rounded-2xl border ${card.borderColor} shadow-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group animate-fadeIn`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{card.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <Icon size={36} className="text-white/30 group-hover:text-white/50 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;