import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function RenewCertification({ certifications, updateCertification }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const cert = certifications.find((c) => c.id === parseInt(id));

  const [formData, setFormData] = useState({
    newExpiryDate: "",
    file: null,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleRenew = (e) => {
    e.preventDefault();

    if (!formData.newExpiryDate) {
      alert("Please select a new expiry date ❌");
      return;
    }

    if (new Date(formData.newExpiryDate) <= new Date(cert.expiryDate)) {
      alert("New expiry date must be after the old expiry date ❌");
      return;
    }

    const renewedCert = {
      ...cert,
      expiryDate: formData.newExpiryDate,
      file: formData.file ? formData.file.name : cert.file,
      notes: formData.notes,
      renewedDate: new Date().toISOString().split("T")[0],
    };

    updateCertification(renewedCert);
    alert("Certification renewed successfully ✅");
    navigate("/user/certifications");
  };

  if (!cert) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-400">
          Certification not found ❌
        </div>
      </DashboardLayout>
    );
  }

  const expiryDate = new Date(cert.expiryDate);
  const today = new Date();
  const isExpired = expiryDate < today;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Renew Certification 🔄
        </h1>

        <form
          onSubmit={handleRenew}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl"
        >
          {/* Certification Name */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Certification
            </label>
            <input
              type="text"
              value={cert.name}
              readOnly
              className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none cursor-not-allowed"
            />
          </div>

          {/* Organization & Old Expiry Date */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Organization
              </label>
              <input
                type="text"
                value={cert.organization}
                readOnly
                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Old Expiry Date
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={new Date(cert.expiryDate).toLocaleDateString()}
                  readOnly
                  className="flex-1 bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none cursor-not-allowed"
                />
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                    isExpired
                      ? "bg-red-500/20 text-red-300"
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {isExpired ? "Expired" : "Expiring"}
                </span>
              </div>
            </div>
          </div>

          {/* New Expiry Date */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              New Expiry Date *
            </label>
            <input
              type="date"
              name="newExpiryDate"
              value={formData.newExpiryDate}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Upload New Certificate */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Upload New Certificate (Optional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white file:bg-blue-600 file:border-0 file:px-4 file:py-2 file:rounded file:text-white file:cursor-pointer hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.file && (
              <p className="text-green-400 text-sm mt-2">
                ✅ File selected: {formData.file.name}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any additional notes..."
              rows="4"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 hover:scale-105"
            >
              Renew Certification ✅
            </button>

            <button
              type="button"
              onClick={() => navigate("/user/certifications")}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default RenewCertification;
