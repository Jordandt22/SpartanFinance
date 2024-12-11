import React, { useState } from "react";

// CSS
import "./Settings.css";

// Contexts
import { useUserAPI } from "../../../context/API/UserAPI.context";
import { useAuth } from "../../../context/Auth/Auth.context";
import { useGlobal } from "../../../context/Global/Global.context";
import { useUser } from "../../../context/User/User.context";
import { useNavigate } from "react-router-dom";

function EditSettingsForm() {
  const { updateUserInfo } = useUserAPI().functions;
  const {
    authState: { uid, accessToken },
  } = useAuth();
  const {
    state: { showLoading, closeLoading },
  } = useGlobal();
  const {
    userState: {
      user: { username },
    },
    userFunctions: { updateUserInfo: updateUserInfoContext },
  } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showLoading("Updating your information...");

    updateUserInfo(uid, accessToken, formData, (error) => {
      if (error) return console.log(error);

      // Update User Context
      updateUserInfoContext(formData);

      // Reset the Form
      setError("");
      setSuccess("Changes saved successfully!");

      // Close Loading and Send back to Settings Page
      closeLoading();
      navigate("/settings");
    });
  };

  return (
    <div className="container">
      <div className="settings-form-container">
        <h1>Account Settings</h1>
        <form onSubmit={handleSubmit} className="settings-form">
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <div className="form-box">
            <h2>Username</h2>
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter new username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditSettingsForm;
