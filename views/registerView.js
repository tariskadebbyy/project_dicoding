const RegisterView = {
  async render(container) {
    container.innerHTML = `
      <section class="register">
        <h2>Daftar Akun</h2>
        <form id="registerForm">
          <label for="name">Nama</label>
          <input type="text" id="name" required />

          <label for="email">Email</label>
          <input type="email" id="email" required />

          <label for="password">Password</label>
          <input type="password" id="password" required />

          <button type="submit">Daftar</button>
        </form>
        <p id="registerMessage" style="color: green;"></p>
      </section>
    `;
  },

  async afterRender() {
    const form = document.querySelector('#registerForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      this._registerCallback({ name, email, password });
    });
  },

  bindRegister(handler) {
    this._registerCallback = handler;
  },

  showErrorMessage(message) {
    alert(message); // Atau bisa tampilkan di <p id="registerMessage">
  },

  showSuccessMessage(message) {
    const messageElement = document.getElementById('registerMessage');
    if (messageElement) {
      messageElement.textContent = message;
    }
  },

  navigateToLogin() {
    window.location.hash = '#/login';
  }
};

export default RegisterView;
