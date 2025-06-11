export const AUTH_CONFIG = {
  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',    
  GOOGLE_REDIRECT_URI: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'https://machine-learning-visualizer.onrender.com/OAuth/google/callback',

  
  // GitHub OAuth
  GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
  GITHUB_REDIRECT_URI: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/callback/github',
  
  // API endpoints
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://machine-learning-visualizer.onrender.com',
  
  // OAuth endpoints
  GOOGLE_AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
  GITHUB_AUTH_URL: 'https://github.com/login/oauth/authorize',
}; 