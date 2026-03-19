import { useState } from "react";
import { useNavigate } from "react-router";
import { CirclePlus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import "../styles/form.scss";

function SetupProfile() {
  const { handleUpdateProfile, loading } = useAuth();

  const [bio, setBio] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!bio || !file) {
      setError("All fields are required");
      return;
    }

    const user = await handleUpdateProfile({
      bio,
      profileImage: file,
    });

    if (!user) {
      setError("Profile update failed. Try again.");
      return;
    }

    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>Saving...</h1>
      </main>
    );
  }

  return (
    <main>
      <section className="form-header">
        <div className="logo">
          <img src="/PixoraLogo.png" alt="logo" />
        </div>
        <h2>Setup Your Profile</h2>
        <p>Tell us more about you</p>
      </section>

      <section className="form-container">
        <h1>Setup Profile</h1>

        <form onSubmit={handleSubmit}>
          {preview && <img src={preview} width="100" alt="Preview" />}

          <label className="upload-btn">
            <CirclePlus />
            Upload Image
            <input type="file" hidden onChange={handleFile} />
          </label>

          <label className="bio">
            Bio <span>(Tell us about yourself)</span>
          </label>

          <textarea
            placeholder="Enter bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default SetupProfile;
