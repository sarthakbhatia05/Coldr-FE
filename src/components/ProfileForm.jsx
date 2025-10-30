import React from 'react';

const ProfileForm = ({ profileData, handleProfileChange, saveProfile, setShowProfileForm }) => (
  <div className="profile-form">
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="profile-name">Full Name</label>
        <input
          type="text"
          id="profile-name"
          name="name"
          value={profileData.name}
          onChange={handleProfileChange}
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="profile-phone">Phone Number</label>
        <input
          type="tel"
          id="profile-phone"
          name="phoneNumber"
          value={profileData.phoneNumber}
          onChange={handleProfileChange}
          placeholder="Enter your phone number"
          required
        />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="profile-position">Default Position/Role</label>
      <input
        type="text"
        id="profile-position"
        name="position"
        value={profileData.position}
        onChange={handleProfileChange}
        placeholder="e.g., Software Engineer"
        required
      />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="profile-experience">Years of Experience</label>
        <input
          type="text"
          id="profile-experience"
          name="experience"
          value={profileData.experience}
          onChange={handleProfileChange}
          placeholder="e.g., 3"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="profile-skills">Key Skills</label>
        <input
          type="text"
          id="profile-skills"
          name="skills"
          value={profileData.skills}
          onChange={handleProfileChange}
          placeholder="e.g., React, Node.js, Python"
          required
        />
      </div>
    </div>
    <div className="profile-actions">
      <button type="button" onClick={saveProfile} className="save-profile-btn">
        Add New Profile
      </button>
      <button
        type="button"
        onClick={() => setShowProfileForm(false)}
        className="cancel-btn"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default ProfileForm;
