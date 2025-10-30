import React from 'react';

const ProfilePreview = ({ profileData }) => (
  <div className="profile-preview">
    <h4>Current Profile:</h4>
    <div className="profile-info">
      <p><strong>Name:</strong> {profileData.name}</p>
      <p><strong>Position:</strong> {profileData.position}</p>
      <p><strong>Experience:</strong> {profileData.experience} years</p>
      <p><strong>Skills:</strong> {profileData.skills}</p>
    </div>
  </div>
);

export default ProfilePreview;
