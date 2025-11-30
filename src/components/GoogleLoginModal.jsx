import React from 'react';
import PropTypes from 'prop-types';
import './LoginScreen.css';

/**
 * Modern login screen component with glassmorphism design
 * @param {Object} props - Component props
 * @param {Function} props.onLogin - Callback function when user clicks login button
 */
const GoogleLoginModal = ({ onLogin }) => {
  return (
    <div className="login-screen" role="dialog" aria-labelledby="login-title" aria-modal="true">
      <div className="login-container">
        {/* Animated Logo */}
        <div className="login-logo">
          <div className="login-logo-container">
            <svg
              className="login-logo-icon"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="loginLogoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>

              {/* Envelope shape */}
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                fill="url(#loginLogoGradient)"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.6"
              />
              <path
                d="M3 6l9 7 9-7"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h1 className="login-logo-text">Coldr</h1>
          </div>
          <div className="login-logo-glow"></div>
        </div>

        {/* Glassmorphism Card */}
        <div className="login-card">
          <h2 id="login-title" className="login-title">
            Welcome Back
          </h2>
          <p className="login-subtitle">
            Sign in to continue sending professional job applications with AI-powered emails
          </p>

          {/* Google Sign In Button */}
          <button 
            className="login-button"
            onClick={onLogin}
            aria-label="Sign in with Google"
          >
            <span className="login-button-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
                  fill="#4285F4"
                />
                <path 
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
                  fill="#34A853"
                />
                <path 
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
                  fill="#FBBC05"
                />
                <path 
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
                  fill="#EA4335"
                />
              </svg>
            </span>
            <span className="login-button-text">Continue with Google</span>
          </button>

          {/* Footer */}
          <div className="login-footer">
            <p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Secure authentication powered by Google
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="login-decoration login-decoration-1"></div>
        <div className="login-decoration login-decoration-2"></div>
      </div>
    </div>
  );
};

GoogleLoginModal.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default GoogleLoginModal;
