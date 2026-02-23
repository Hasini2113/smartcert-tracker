import DashboardLayout from "../layouts/DashboardLayout";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";
import { Calendar, AlertCircle, CheckCircle, RotateCw } from "lucide-react";

function UserDashboard({ certifications }) {
  const today = new Date();

  const total = certifications.length;

  const active = certifications.filter((cert) => {
    const diff = new Date(cert.expiryDate) - today;
    return diff > 30 * 24 * 60 * 60 * 1000;
  }).length;

  const expiringSoon = certifications.filter((cert) => {
    const diffDays = Math.ceil(
      (new Date(cert.expiryDate) - today) /
        (1000 * 60 * 60 * 24)
    );
    return diffDays >= 0 && diffDays <= 30;
  }).length;

  const expired = certifications.filter(
    (cert) => new Date(cert.expiryDate) < today
  ).length;

  const needsRenewal = expiringSoon + expired;
  const healthPercentage = total > 0 ? Math.round((active / total) * 100) : 0;

  // Data for statistics
  const statusData = [
    { name: "Active", value: active, color: "#22c55e" },
    { name: "Expiring Soon", value: expiringSoon, color: "#f97316" },
    { name: "Expired", value: expired, color: "#ef4444" },
  ];

  // Certifications by organization
  const orgData = certifications.reduce((acc, cert) => {
    const existing = acc.find((item) => item.name === cert.organization);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: cert.organization, count: 1 });
    }
    return acc;
  }, []);

  // Upcoming renewals (next 30 days)
  const upcomingRenewals = certifications
    .filter((cert) => {
      const diffDays = Math.ceil(
        (new Date(cert.expiryDate) - today) /
          (1000 * 60 * 60 * 24)
      );
      return diffDays >= 0 && diffDays <= 30;
    })
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-12 text-white">
        Dashboard Analytics 📊
      </h1>

      {/* Health Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {/* Total Certifications */}
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-8 rounded-2xl border border-blue-400/30 shadow-2xl hover:shadow-blue-500/20 transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm font-semibold uppercase">
                Total Certificates
              </h3>
              <p className="text-4xl font-bold text-blue-400 mt-3">
                <CountUp end={total} duration={1.5} />
              </p>
            </div>
            <CheckCircle size={40} className="text-blue-400/50" />
          </div>
        </div>

        {/* Active Certifications */}
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-8 rounded-2xl border border-green-400/30 shadow-2xl hover:shadow-green-500/20 transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm font-semibold uppercase">
                Active
              </h3>
              <p className="text-4xl font-bold text-green-400 mt-3">
                <CountUp end={active} duration={1.5} />
              </p>
            </div>
            <CheckCircle size={40} className="text-green-400/50" />
          </div>
        </div>

        {/* Expiring Soon */}
        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-8 rounded-2xl border border-orange-400/30 shadow-2xl hover:shadow-orange-500/20 transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm font-semibold uppercase">
                Expiring Soon (30d)
              </h3>
              <p className="text-4xl font-bold text-orange-400 mt-3">
                <CountUp end={expiringSoon} duration={1.5} />
              </p>
            </div>
            <AlertCircle size={40} className="text-orange-400/50" />
          </div>
        </div>

        {/* Expired */}
        <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-8 rounded-2xl border border-red-400/30 shadow-2xl hover:shadow-red-500/20 transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm font-semibold uppercase">
                Expired
              </h3>
              <p className="text-4xl font-bold text-red-400 mt-3">
                <CountUp end={expired} duration={1.5} />
              </p>
            </div>
            <AlertCircle size={40} className="text-red-400/50" />
          </div>
        </div>
      </div>

      {/* Certificate Health & Renewals Needed */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Health Score */}
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Certificate Health Score</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="16"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke={healthPercentage >= 70 ? "#22c55e" : healthPercentage >= 40 ? "#f97316" : "#ef4444"}
                  strokeWidth="16"
                  strokeDasharray={`${(healthPercentage / 100) * (2 * Math.PI * 88)} ${2 * Math.PI * 88}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-white">{healthPercentage}%</p>
                <p className="text-gray-300 text-sm">Healthy</p>
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-center mt-6 text-sm">
            {healthPercentage >= 70
              ? "✅ Great! All certificates in good standing"
              : healthPercentage >= 40
              ? "⚠️ Some certificates need attention"
              : "❌ Immediate action required"}
          </p>
        </div>

        {/* Renewals Due */}
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Action Required</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <RotateCw size={32} className="text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-gray-300 text-sm">Certificates to Renew</p>
                <p className="text-3xl font-bold text-orange-400">
                  <CountUp end={needsRenewal} duration={1.5} />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Calendar size={32} className="text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-gray-300 text-sm">Certifications Added</p>
                <p className="text-3xl font-bold text-blue-400">
                  <CountUp end={total} duration={1.5} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Status Distribution Pie Chart */}
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Certifications by Organization */}
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">By Organization</h2>
          {orgData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orgData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-12">No certificates added yet</p>
          )}
        </div>
      </div>

      {/* Upcoming Renewals */}
      {upcomingRenewals.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">📅 Upcoming Renewals (Next 30 Days)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-blue-400 font-semibold">Certificate</th>
                  <th className="text-left px-4 py-3 text-blue-400 font-semibold">Organization</th>
                  <th className="text-left px-4 py-3 text-blue-400 font-semibold">Expiry Date</th>
                  <th className="text-left px-4 py-3 text-blue-400 font-semibold">Days Left</th>
                </tr>
              </thead>
              <tbody>
                {upcomingRenewals.map((cert) => {
                  const daysLeft = Math.ceil(
                    (new Date(cert.expiryDate) - today) /
                      (1000 * 60 * 60 * 24)
                  );
                  return (
                    <tr
                      key={cert.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="px-4 py-4 text-white font-medium">{cert.name}</td>
                      <td className="px-4 py-4 text-gray-300">{cert.organization}</td>
                      <td className="px-4 py-4 text-gray-300">
                        {new Date(cert.expiryDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            daysLeft < 0
                              ? "bg-red-500/20 text-red-400"
                              : daysLeft <= 7
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default UserDashboard;