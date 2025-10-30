import React from 'react';

const ApplicationForm = ({ applicationData, handleApplicationChange, handleSubmit, isLoading }) => (
  <form onSubmit={handleSubmit} className="application-form">
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="recipientName">Recipient Name</label>
        <input
          type="text"
          id="recipientName"
          name="recipientName"
          value={applicationData.recipientName}
          onChange={handleApplicationChange}
          placeholder="Hiring manager's name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Recipient Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={applicationData.email}
          onChange={handleApplicationChange}
          placeholder="Enter your email address"
          required
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="company">Company Name</label>
        <input
          type="text"
          id="company"
          name="company"
          value={applicationData.company}
          onChange={handleApplicationChange}
          placeholder="Enter company name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Position/Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={applicationData.role}
          onChange={handleApplicationChange}
          placeholder="e.g., Software Engineer"
          required
        />
      </div>
    </div>
    <button type="submit" className="send-btn" disabled={isLoading}>
      {isLoading ? (
        <>
          <div className="spinner"></div>
          Sending...
        </>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22,2 15,22 11,13 2,9 22,2" />
          </svg>
          Send Application
        </>
      )}
    </button>
  </form>
);

export default ApplicationForm;
