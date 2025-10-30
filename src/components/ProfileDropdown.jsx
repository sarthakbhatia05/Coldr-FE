import React from 'react';

const ProfileDropdown = ({
  storedProfiles,
  selectedProfileId,
  showProfileDropdown,
  setShowProfileDropdown,
  handleProfileSelect,
  deleteProfile,
  setShowProfileForm,
  setProfileData
}) => (
  <div className="dropdown-container profile-dropdown-container">
    <button
      className="dropdown-trigger"
      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
    >
      <span>
        {storedProfiles.length > 0
          ? `${storedProfiles.find(p => p.id === selectedProfileId)?.name || 'Select Profile'} • ${storedProfiles.find(p => p.id === selectedProfileId)?.position || ''}`
          : 'Select Profile'}
      </span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6,9 12,15 18,9" />
      </svg>
    </button>
    {showProfileDropdown && (
      <div className="dropdown-menu">
        <div className="dropdown-section">
          <div className="dropdown-header">Profiles</div>
          {storedProfiles.map(profile => (
            <div key={profile.id} className="dropdown-item">
              <div className="dropdown-item-content" onClick={() => handleProfileSelect(profile.id)}>
                <div className="dropdown-item-name">
                  {profile.name}
                  {selectedProfileId === profile.id && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="selection-tick">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  )}
                </div>
                <div className="dropdown-item-details">{profile.position} • {profile.experience} years exp</div>
              </div>
              <button
                className="dropdown-delete"
                onClick={() => deleteProfile(profile.id)}
                title="Delete profile"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6" />
                  <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                </svg>
              </button>
            </div>
          ))}
          <button
            className="dropdown-add"
            onClick={() => {
              setShowProfileForm(true);
              setProfileData({ name: '', phoneNumber: '', position: '', skills: '', experience: '' });
              setShowProfileDropdown(false);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add New Profile
          </button>
        </div>
      </div>
    )}
  </div>
);

export default ProfileDropdown;
