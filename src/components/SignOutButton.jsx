import React from 'react';

const SignOutButton = ({ onSignOut }) => (
  <button className="signout-btn" onClick={onSignOut} title="Sign Out">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="signoutGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path d="M17 16l4-4m0 0l-4-4m4 4H7" stroke="url(#signoutGradient)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" stroke="url(#signoutGradient)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
);

export default SignOutButton;
