import { useContext, useState, useEffect } from "react";
import { NotesContext } from "../../context/NotesContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Footer from "./Footer";
import { showSuccess, showError } from "../../utils/toast";

const Profile = () => {
  const { user, setUser } = useContext(NotesContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profileImg: "",
    profession: "",
    gender: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        profileImg: user.profileImg || "",
        profession: user.profession || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User not logged in</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch("/api/auth/profile", formData);
      if (res.data.success) {
        showSuccess(res.data.message);
        setUser(res.data.user);
      }
    } catch (error) {
      showError("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      navigate("/");
    } catch {
      showError("Logout failed");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-200 px-6 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* LEFT SIDE - EDIT FORM */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="label font-semibold">Profile Image URL</label>
                <input
                  type="text"
                  name="profileImg"
                  placeholder="Enter image URL"
                  className="input input-bordered w-full"
                  value={formData.profileImg}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="label font-semibold">Profession</label>
                <input
                  type="text"
                  name="profession"
                  placeholder="Enter profession"
                  className="input input-bordered w-full"
                  value={formData.profession}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="label font-semibold">Gender</label>
                <select
                  name="gender"
                  className="select select-bordered w-full"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="btn btn-primary flex-1">Save Changes</button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-error flex-1"
                >
                  Logout
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT SIDE - PROFILE PREVIEW */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center">
            {user.profileImg ? (
              <img
                src={user.profileImg}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center text-4xl shadow-md">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
            <p className="opacity-70">{user.email}</p>

            <div className="badge badge-primary mt-2">{user.role}</div>

            <div className="divider my-6"></div>

            <div className="space-y-3 text-left w-full">
              <div className="flex justify-between">
                <span className="font-semibold">User ID:</span>
                <span className="opacity-70 text-sm">{user._id}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Profession:</span>
                <span className="opacity-70">
                  {user.profession || "Not specified"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Gender:</span>
                <span className="opacity-70">
                  {user.gender || "Not specified"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Joined:</span>
                <span className="opacity-70 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
