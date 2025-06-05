const BASE_URL = 'https://story-api.dicoding.dev/v1';

const RegisterPresenter = {
  async init(view) {
    this._view = view;
    this._view.bindRegister(this._handleRegister.bind(this));
  },

  async _handleRegister({ name, email, password }) {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Gagal registrasi');
      }

      this._view.showSuccessMessage('Registrasi berhasil! Silakan login.');
      this._view.navigateToLogin();
    } catch (error) {
      this._view.showErrorMessage(error.message);
    }
  }
};

export default RegisterPresenter;
