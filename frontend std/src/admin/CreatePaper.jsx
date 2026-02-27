import { useState } from "react";
import api from "../services/api";
import Footer from "../components/layout/Footer";

const CreatePaper = () => {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    year: "",
    price: "",
  });

  const [questionPdf, setQuestionPdf] = useState(null);
  const [answerPdf, setAnswerPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subject", form.subject);
    formData.append("year", form.year);
    formData.append("price", form.price);
    formData.append("questionPdf", questionPdf);
    formData.append("answerPdf", answerPdf);

    try {
      await api.post("/api/v2/admin/create", formData);
      setSuccess("Paper Uploaded Successfully ✅");
      setForm({ title: "", subject: "", year: "", price: "" });
      setQuestionPdf(null);
      setAnswerPdf(null);
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-10 text-white">
        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold mb-2">Upload Paper</h1>
          <p className="text-gray-400 mb-8 text-sm">
            Upload Question & Answer PDFs for students.
          </p>

          {success && (
            <div className="bg-green-500/20 text-green-400 p-3 rounded mb-6 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />
            <InputField
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />
            <InputField
              name="year"
              type="number"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
            />
            <InputField
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            />

            <FileUpload
              label="Question PDF"
              onChange={(e) => setQuestionPdf(e.target.files[0])}
            />
            <FileUpload
              label="Answer PDF"
              onChange={(e) => setAnswerPdf(e.target.files[0])}
            />

            <button
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Uploading..." : "Upload Paper"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

const InputField = ({ name, placeholder, value, onChange, type = "text" }) => (
  <input
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    required
    className="w-full p-3 bg-white/10 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

const FileUpload = ({ label, onChange }) => (
  <div>
    <label className="block text-sm mb-2 text-gray-300">{label}</label>
    <input
      type="file"
      accept="application/pdf"
      onChange={onChange}
      required
      className="w-full text-sm bg-white/10 p-2 rounded-lg border border-white/10"
    />
  </div>
);

export default CreatePaper;
