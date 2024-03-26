function auth() {
  return {
    username: '',
    password: '',

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
          alert('Registration failed!');
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
          alert('Login successful!');
        } else {
          alert('Login failed!');
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
        const response = await fetch('/api/hello', {
          method: 'GET',
          headers: {
            'Authorization': token,
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Response from protected route:', data);
        } else {
          console.error('Error accessing protected route:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },

    logout() {
      localStorage.removeItem('token');
      alert('Logged out successfully!');
    }
  };
}