import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function AddCertification({ addCertification }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    issueDate: "",
    expiryDate: "",
    file: null,
    fileName: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFormData({
          ...formData,
          file: URL.createObjectURL(selectedFile),
          fileName: selectedFile.name,
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCertification(formData);
    navigate("/user/certifications");
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-10 text-white">
        Add Certification ✨
      </h1>

      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 max-w-xl">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Certification Name"
            onChange={handleChange}
            required
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Organization */}
          <input
            type="text"
            name="organization"
            placeholder="Issuing Organization"
            onChange={handleChange}
            required
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Issue Date */}
          <input
            type="date"
            name="issueDate"
            onChange={handleChange}
            required
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Expiry Date */}
          <input
            type="date"
            name="expiryDate"
            onChange={handleChange}
            required
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 🔥 Custom File Upload */}
          <div className="flex flex-col space-y-2">

            <label className="text-gray-300 font-medium">
              Upload Certificate (PDF)
            </label>

            <label className="cursor-pointer bg-gray-800 border border-gray-600 hover:border-blue-500 transition rounded-xl p-4 text-center text-gray-400 hover:text-white">

              {formData.fileName
                ? formData.fileName
                : "Click to Upload PDF"}

              <input
                type="file"
                name="file"
                accept="application/pdf"
                onChange={handleChange}
                className="hidden"
              />

            </label>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300 hover:scale-105"
          >
            Add Certification 🚀
          </button>

        </form>
      </div>
    </DashboardLayout>
  );
}

export default AddCertification;