import React from 'react';

const ResumeUpload = ({ handleResumeUpload }) => (
  <div className="upload-section">
    <h3>📄 Upload Resume</h3>
    <div className="upload-area">
      <input
        type="file"
        id="resume-upload"
        accept=".pdf"
        onChange={handleResumeUpload}
        className="file-input"
      />
      <label htmlFor="resume-upload" className="upload-label">
        <div className="upload-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
        </div>
        <p className="upload-text">
          <strong>Click to upload</strong> or drag and drop your PDF resume
        </p>
        <p className="upload-hint">PDF files only, max 10MB</p>
      </label>
    </div>
  </div>
);

export default ResumeUpload;
