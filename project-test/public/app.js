function getUsername() {
  return localStorage.getItem('username');
}

function auth() {
  return {
    username: '',
    password: '',
    isLoading: false,
    isAdmin: false,
    getUsername: getUsername(),

    async initializeAuth() { 
      this.isLoading = true;
      const token = localStorage.getItem('token');
      if (!token) {
        // console.error('JWT token not found in local storage');
        this.isLoading = false;
        return;
      }
    
      try {
        const response = await fetch('/user/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token // Include the token in the request headers
          }
        });

        if (response.ok) {
          const data = await response.json();
          this.isAdmin = data.isAdmin; // Set isAdmin based on the response
        } else {
          throw new Error(`Error verifying token: ${response.status}`);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      } finally {
        this.isLoading = false;
      }
    },
       
    async register() {
      if (!this.username || !this.password) {
        alert('Please enter both username and password.');
        return;
      }

      try {
        const response = await fetch('/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: this.username, password: this.password })
        });

        if (response.ok) {
          alert('Registration successful!');
        } else {
          throw new Error(`Registration failed: ${response.status}`);
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },

    async login() {
      try {
        const response = await fetch('/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: this.username, password: this.password })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', this.username);
          alert('Login successful!');
          window.location.href = '/index.html';
        } else {
          throw new Error(`Login failed: ${response.status}`);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },

    async testProtectedRoute() {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('JWT token not found in local storage');
        return;
      }

      try {
        const response = await fetch('/api/admin', {
          method: 'GET',
          headers: {
            'Authorization': token, // Include the token in the request headers,
          }
        });

        if (response.ok) {
          console.log('Response from protected route:', await response.json());
        } else {
          throw new Error(`Error accessing protected route: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      alert('Logged out successfully!');
      window.location.href = '/login.html';
    }
  };
}
