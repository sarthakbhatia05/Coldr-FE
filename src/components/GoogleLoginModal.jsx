import React from 'react';


const GoogleLoginModal = ({ onLogin }) => (
  <div className="modal-overlay google-modal-overlay">
    <div className="google-modal-card">
      <div className="google-modal-logo">
        <svg width="48" height="48" viewBox="0 0 48 48">
          <g>
            <path fill="#4285F4" d="M24 9.5c3.54 0 6.04 1.53 7.43 2.81l5.48-5.48C33.44 3.36 28.98 1 24 1 14.61 1 6.48 7.98 3.5 17.02l6.73 5.23C12.13 15.09 17.56 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.5 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.65c-.54 2.91-2.18 5.38-4.65 7.04l7.19 5.59C43.52 37.02 46.5 31.27 46.5 24.5z"/>
            <path fill="#FBBC05" d="M10.23 28.25c-1.09-3.22-1.09-6.78 0-10l-6.73-5.23C1.64 16.61 0 20.13 0 24c0 3.87 1.64 7.39 3.5 10.98l6.73-5.23z"/>
            <path fill="#EA4335" d="M24 46c5.98 0 11.02-1.98 14.98-5.39l-7.19-5.59c-2.01 1.35-4.59 2.13-7.79 2.13-6.44 0-11.87-5.59-13.77-13.25l-6.73 5.23C6.48 40.02 14.61 46 24 46z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </g>
        </svg>
      </div>
      <h2 className="google-modal-title">Sign in to Coldr</h2>
      <p className="google-modal-desc">To use Coldr, please sign in with your Google account.<br/>We use Google to securely send job applications on your behalf.</p>
      <button className="google-login-btn" onClick={onLogin}>
        <span className="google-btn-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g>
              <path fill="#4285F4" d="M21.35 11.1H12.18v2.8h5.18c-.22 1.18-1.32 3.47-5.18 3.47-3.12 0-5.67-2.59-5.67-5.77s2.55-5.77 5.67-5.77c1.78 0 2.97.76 3.65 1.41l2.49-2.42C17.13 3.99 14.89 2.8 12.18 2.8 6.98 2.8 2.8 7.08 2.8 12.2s4.18 9.4 9.38 9.4c5.41 0 8.99-3.81 8.99-9.18 0-.62-.07-1.09-.17-1.32z"/>
            </g>
          </svg>
        </span>
        <span className="google-btn-text">Continue with Google</span>
      </button>
      <div className="google-modal-footer">
        <small>We never store your password. Authentication is handled securely by Google.</small>
      </div>
    </div>
  </div>
);

export default GoogleLoginModal;
