document.addEventListener('DOMContentLoaded', function() {
  const authLink = document.getElementById('auth-link');
  if (!authLink) return;
  
  // Detect if we're on a page in /pages directory or on home
  const isInPages = window.location.pathname.includes('/pages/');
  const loginUrl = isInPages ? 'portal-login.html' : 'pages/portal-login.html';
  const dashboardUrl = isInPages ? 'portal-dashboard.html' : 'pages/portal-dashboard.html';
  
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');
  
  if (token && userData) {
    try {
      const user = JSON.parse(userData);
      const username = user.username || 'Partner';
      authLink.textContent = `Welcome ${username}`;
      authLink.href = dashboardUrl;
    } catch (e) {
      authLink.textContent = 'Login';
      authLink.href = loginUrl;
    }
  } else {
    authLink.textContent = 'Login';
    authLink.href = loginUrl;
  }
});
