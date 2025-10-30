const Header = () => (
  <div className="header">
    <div className="title-with-logo">
      <svg
        className="app-logo"
        width="38"
        height="38"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
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
          fill="url(#logoGradient)"
          stroke="rgba(255,255,255,0.4)"
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

      <h1>Coldr</h1>
    </div>
    <p>Send professional job applications with ease</p>
  </div>
);


export default Header;
