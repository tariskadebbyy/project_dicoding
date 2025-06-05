const LoginView = {
  async render(container) {
    container.innerHTML = `
  <section class="form-container">
    <h2>Login</h2>
    <form id="loginForm">
      <label for="email">Email</label>
      <input type="email" id="email" required />
      
      <label for="password">Password</label>
      <input type="password" id="password" required />
      
      <button type="submit">Login</button>
    </form>
    <p id="loginError" style="color: red; margin-top: 10px;"></p>
  </section>
`;
  },

  async afterRender() {
    const form = document.querySelector('#loginForm');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !password) {
        this.showErrorMessage('Email dan password wajib diisi.');
        return;
      }

      this.showErrorMessage('');
      this._loginCallback({ email, password });
    });
  },

  bindLogin(handler) {
    this._loginCallback = handler;
  },

  showErrorMessage(message) {
    const errorContainer = document.getElementById('loginError');
    if (errorContainer) {
      errorContainer.textContent = message;
    } else {
      alert(message);
    }
  },

  navigateToHome() {
    window.location.hash = '#/home';
  },
};

export default LoginView;
