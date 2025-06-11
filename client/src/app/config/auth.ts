export const AUTH_CONFIG = {
  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',    
  GOOGLE_REDIRECT_URI: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'https://machine-learning-visualizer.onrender.com/OAuth/google/callback',
  
  // API endpoints
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://machine-learning-visualizer.onrender.com',
  
  // OAuth endpoints
  GOOGLE_AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
}; 