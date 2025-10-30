import React from 'react';

const ResumeDropdown = ({
  storedResumes,
  selectedResumeId,
  showResumeDropdown,
  setShowResumeDropdown,
  handleResumeSelect,
  deleteResume,
  handleResumeUpload
}) => (
  <div className="dropdown-container resume-dropdown-container">
    <button
      className="dropdown-trigger"
      onClick={() => setShowResumeDropdown(!showResumeDropdown)}
    >
      <span>
        {storedResumes.length > 0
          ? storedResumes.find(r => r.id === selectedResumeId)?.name || 'Select Resume'
          : 'Select Resume'}
      </span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6,9 12,15 18,9" />
      </svg>
    </button>
    {showResumeDropdown && (
      <div className="dropdown-menu">
        <div className="dropdown-section">
          <div className="dropdown-header">Resumes</div>
          {storedResumes.map(resume => (
            <div key={resume.id} className="dropdown-item">
              <div className="dropdown-item-content" onClick={() => handleResumeSelect(resume.id)}>
                <div className="dropdown-item-name">
                  {resume.name.length > 20 ? resume.name.slice(0, 17) + '...' : resume.name}
                  {selectedResumeId === resume.id && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="selection-tick">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  )}
                </div>
                <div className="dropdown-item-details">{(resume.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
              <button
                className="dropdown-delete"
                onClick={() => deleteResume(resume.id)}
                title="Delete resume"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6" />
                  <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                </svg>
              </button>
            </div>
          ))}
          <label className="dropdown-add" htmlFor="resume-upload-new">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Upload New Resume
            <input
              type="file"
              id="resume-upload-new"
              accept=".pdf"
              onChange={handleResumeUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
    )}
  </div>
);

export default ResumeDropdown;
