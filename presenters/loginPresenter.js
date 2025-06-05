const BASE_URL = 'https://story-api.dicoding.dev/v1';

const LoginPresenter = {
  async init(view) {
    this._view = view;
    this._view.bindLogin(this._handleLogin.bind(this));
  },

  async _handleLogin({ email, password }) {
    try {
      console.log('Login attempt with:', email, password);
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log('Login response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Login gagal');
      }

      const user = result.loginResult || {};
      const token = user.token;
      const name = user.name;
      const userId = user.userId;

      if (!token || !userId) {
        throw new Error("Login gagal: data pengguna tidak lengkap.");
      }

      localStorage.setItem('token', token);
      localStorage.setItem('userName', name);
      localStorage.setItem('userId', userId);

      this._view.navigateToHome();
    } catch (error) {
      this._view.showErrorMessage(error.message);
    }
  },
};

export default LoginPresenter;
