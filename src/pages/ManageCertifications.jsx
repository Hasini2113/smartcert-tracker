import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Trash2, CheckCircle } from "lucide-react";

function ManageCertifications() {
  const [certifications, setCertifications] = useState(() => {
    const userCerts = JSON.parse(localStorage.getItem("userCertifications")) || [];
    
    // Combine app state and stored certifications
    const allCerts = [
      {
        id: 1,
        name: "AWS Cloud Practitioner",
        organization: "Amazon",
        issueDate: "2024-01-01",
        expiryDate: "2026-01-01",
        username: "demo",
        status: "active",
      },
      ...userCerts,
    ];
    return allCerts;
  });
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const today = new Date();

  const getCertStatus = (expiryDate) => {
    const diff = new Date(expiryDate) - today;
    if (diff < 0) return "expired";
    if (diff < 30 * 24 * 60 * 60 * 1000) return "expiring_soon";
    return "active";
  };

  const handleDeleteCert = (id) => {
    if (window.confirm("Delete this certification?")) {
      const updated = certifications.filter((cert) => cert.id !== id);
      setCertifications(updated);
      localStorage.setItem("userCertifications", JSON.stringify(updated));
    }
  };

  const handleApproveCert = (id) => {
    const updated = certifications.map((cert) =>
      cert.id === id ? { ...cert, status: "approved" } : cert
    );
    setCertifications(updated);
    localStorage.setItem("userCertifications", JSON.stringify(updated));
  };

  let filtered = certifications;

  if (filterType === "expired") {
    filtered = certifications.filter((cert) => getCertStatus(cert.expiryDate) === "expired");
  } else if (filterType === "expiring_soon") {
    filtered = certifications.filter((cert) => getCertStatus(cert.expiryDate) === "expiring_soon");
  } else if (filterType === "active") {
    filtered = certifications.filter((cert) => getCertStatus(cert.expiryDate) === "active");
  }

  filtered = filtered.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "expired":
        return "bg-red-500/20 text-red-300";
      case "expiring_soon":
        return "bg-yellow-500/20 text-yellow-300";
      case "active":
        return "bg-green-500/20 text-green-300";
      default:
        return "bg-blue-500/20 text-blue-300";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "expired":
        return "❌ Expired";
      case "expiring_soon":
        return "⏰ Expiring Soon";
      case "active":
        return "✅ Active";
      default:
        return "📋 Pending";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-white mb-6">📜 Manage Certifications</h1>

        {/* Filter & Search */}
        <div className="grid md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Search by name or org..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:col-span-3 px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Certifications</option>
            <option value="active">✅ Active</option>
            <option value="expiring_soon">⏰ Expiring Soon</option>
            <option value="expired">❌ Expired</option>
          </select>
        </div>

        {/* Certifications Table */}
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 overflow-x-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Total Certifications: {filtered.length}
          </h2>

          {filtered.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No certifications found</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-blue-400 font-semibold">Certificate Name</th>
                  <th className="px-4 py-3 text-left text-blue-400 font-semibold">Organization</th>
                  <th className="px-4 py-3 text-left text-blue-400 font-semibold">Issue Date</th>
                  <th className="px-4 py-3 text-left text-blue-400 font-semibold">Expiry Date</th>
                  <th className="px-4 py-3 text-left text-blue-400 font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-blue-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cert) => {
                  const status = getCertStatus(cert.expiryDate);
                  const isExpiringSoon = status === "expiring_soon";

                  return (
                    <tr key={cert.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-4 py-4 text-white font-medium">{cert.name}</td>
                      <td className="px-4 py-4 text-gray-300">{cert.organization}</td>
                      <td className="px-4 py-4 text-gray-300 text-sm">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-gray-300 text-sm">
                        <span
                          className={
                            status === "expired" ? "text-red-400 font-semibold" : ""
                          }
                        >
                          {new Date(cert.expiryDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(status)}`}>
                          {getStatusLabel(status)}
                        </span>
                      </td>
                      <td className="px-4 py-4 flex gap-3">
                        {isExpiringSoon && (
                          <button
                            onClick={() => handleApproveCert(cert.id)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm transition"
                          >
                            <CheckCircle size={16} />
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteCert(cert.id)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm transition"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-6 rounded-2xl border border-blue-400/30 shadow-2xl">
            <h3 className="text-gray-300 text-sm font-semibold uppercase">Total</h3>
            <div className="text-3xl font-bold text-blue-400 mt-2">{certifications.length}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-6 rounded-2xl border border-green-400/30 shadow-2xl">
            <h3 className="text-gray-300 text-sm font-semibold uppercase">Active</h3>
            <div className="text-3xl font-bold text-green-400 mt-2">
              {certifications.filter((c) => getCertStatus(c.expiryDate) === "active").length}
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-6 rounded-2xl border border-yellow-400/30 shadow-2xl">
            <h3 className="text-gray-300 text-sm font-semibold uppercase">Expiring Soon</h3>
            <div className="text-3xl font-bold text-yellow-400 mt-2">
              {certifications.filter((c) => getCertStatus(c.expiryDate) === "expiring_soon").length}
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-6 rounded-2xl border border-red-400/30 shadow-2xl">
            <h3 className="text-gray-300 text-sm font-semibold uppercase">Expired</h3>
            <div className="text-3xl font-bold text-red-400 mt-2">
              {certifications.filter((c) => getCertStatus(c.expiryDate) === "expired").length}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ManageCertifications;
