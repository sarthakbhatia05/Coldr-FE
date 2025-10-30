import React from 'react';

const ContinueButton = ({ onClick }) => (
  <div className="continue-section">
    <button type="button" onClick={onClick} className="continue-btn">
      Continue to Applications
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

export default ContinueButton;
