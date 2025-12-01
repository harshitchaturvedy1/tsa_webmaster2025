document.addEventListener('DOMContentLoaded', function() {
  const authLink = document.getElementById('auth-link');
  if (!authLink) return;
  
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');
  
  if (token && userData) {
    try {
      const user = JSON.parse(userData);
      const username = user.username || 'Partner';
      authLink.textContent = `Welcome ${username}`;
      authLink.href = 'pages/portal-dashboard.html';
      // Make it easier to identify as logged in
      authLink.style.opacity = '1';
    } catch (e) {
      // Fall back to default
    }
  } else {
    authLink.textContent = 'Login';
    authLink.href = 'pages/portal-login.html';
  }
});
