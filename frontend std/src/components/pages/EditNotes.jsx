import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Footer from "../layout/Footer";
import { showError, showInfo, showSuccess } from "../../utils/toast";

const EditNotes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ===== Fetch Note ===== */
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/api/notes/getnotes/${id}`);

        if (res.data?.note) {
          setFormData({
            title: res.data.note.title || "",
            content: res.data.note.content || "",
          });
        }
      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
        showError(
          "Unable to load note:",
          error.response?.data || error.message,
        );

        navigate("/notes");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNote();
  }, [id]);

  /* ===== Handle Change ===== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===== Handle Update ===== */
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      return showInfo("Title and content are required");
    }

    try {
      setSaving(true);

      await api.put(`/api/notes/update/${id}`, {
        title: formData.title.trim(),
        content: formData.content.trim(),
      });

      showSuccess("Note updated successfully");
      navigate("/notes");
    } catch (error) {
      showError("Update error:", error.response?.data || error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-200 p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-2xl shadow">
          <h1 className="text-2xl font-bold mb-6">Edit Note</h1>

          {loading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Title */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  autoFocus
                  className="input input-bordered w-full"
                />
              </div>

              {/* Content */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Content</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="8"
                  className="textarea textarea-bordered w-full resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/notes")}
                  className="btn btn-outline"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Update Note"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditNotes;
