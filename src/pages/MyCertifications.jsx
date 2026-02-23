import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function MyCertifications({ certifications, deleteCertification }) {
  const today = new Date();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredCertifications = certifications.filter((cert) =>
    cert.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8 text-white">
        My Certifications 📜
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Certification..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full bg-gray-800 text-white border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/10">

        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-4">Name</th>
              <th>Organization</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCertifications.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No Certifications Found 🚀
                </td>
              </tr>
            ) : (
              filteredCertifications.map((cert) => {
                const expiryDate = new Date(cert.expiryDate);
                const isExpired = expiryDate < today;

                return (
                  <tr
                    key={cert.id}
                    className="border-b border-gray-700 hover:bg-white/10 transition-all duration-300"
                  >
                    <td className="py-4 text-white font-medium align-middle">
                      {cert.name}
                    </td>

                    <td className="py-4 align-middle">
                      {cert.organization}
                    </td>

                    <td className="py-4 align-middle">
                      {cert.expiryDate}
                    </td>

                    {/* Status */}
                    <td className="py-4 align-middle">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          isExpired
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {isExpired ? "Expired" : "Active"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 align-middle">
                      <div className="flex items-center gap-3">

                        {isExpired && (
                          <button
                            onClick={() =>
                              navigate(`/user/renew/${cert.id}`)
                            }
                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg transition text-sm"
                          >
                            Renew
                          </button>
                        )}

                        <button
                          onClick={() =>
                            navigate(`/user/edit/${cert.id}`)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteCertification(cert.id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition text-sm"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>

      </div>
    </DashboardLayout>
  );
}

export default MyCertifications;