import { useEffect, useState } from 'react';

export default function useAuth() {
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for tokens in localStorage
    const storedRefreshToken = localStorage.getItem('refresh_token');
    setRefreshToken(storedRefreshToken);
    setIsAuthenticated(!!storedRefreshToken);
  }, []);

  // Listen for callback in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refresh_token = params.get('refresh_token');
    if (refresh_token) {
      localStorage.setItem('refresh_token', refresh_token);
      setRefreshToken(refresh_token);
      setIsAuthenticated(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return {
    refreshToken,
    isAuthenticated,
    setRefreshToken,
    setIsAuthenticated,
  };
}
