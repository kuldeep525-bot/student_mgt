import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { showError, showInfo, showSuccess } from "../../utils/toast";

const CreateNote = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateNote = async () => {
    if (!title || !content) {
      return showInfo("Title and Content are required");
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/api/notes/create",
        { title, content },
        { withCredentials: true },
      );

      if (res.data.success) {
        // alert(res.data.message);
        showSuccess(res.data.message)
        navigate("/notes");
      }
    } catch (error) {
      showError(error.response?.data?.message || "Note creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-base-200  flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6">Create New Note ✍️</h1>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />

          <textarea
            rows="8"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full resize-none"
          />

          <div className="flex gap-4">
            <button
              onClick={handleCreateNote}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Creating..." : "Create Note"}
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
