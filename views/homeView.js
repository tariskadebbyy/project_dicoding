import L from 'leaflet';

const HomeView = {
  /**
   * Render kerangka dasar halaman ke container.
   * @param {HTMLElement} container - Elemen DOM untuk render
   */
  async render(container) {
    container.innerHTML = `
      <main>
        <section aria-labelledby="story-section">
          <h2 id="story-section">Daftar Cerita</h2>

          <form id="storyForm" aria-label="Formulir tambah cerita">
            <div>
              <label for="nameInput">Nama:</label>
              <input type="text" id="nameInput" name="name" required />
            </div>
            <div>
              <label for="descriptionInput">Deskripsi:</label>
              <input type="text" id="descriptionInput" name="description" required />
            </div>
            <div>
              <label for="photoUrlInput">URL Foto:</label>
              <input type="text" id="photoUrlInput" name="photoUrl" required />
            </div>
            <div>
              <label for="latInput">Latitude:</label>
              <input type="number" id="latInput" name="lat" step="any" required />
            </div>
            <div>
              <label for="lonInput">Longitude:</label>
              <input type="number" id="lonInput" name="lon" step="any" required />
            </div>
            <button type="submit">Tambah Cerita</button>
          </form>

          <div id="form-feedback" aria-live="polite" style="margin-top: 1rem;"></div>

          <div id="story-list" style="margin-top: 2rem;"></div>
          <div id="map" style="height: 400px; margin-top: 2rem;" aria-label="Peta lokasi cerita"></div>
        </section>
      </main>
    `;
  },

  /**
   * Render daftar cerita dan peta berdasarkan data stories
   * @param {Array} stories - Array data cerita
   */
  renderStories(stories) {
    const listEl = document.getElementById('story-list');
    listEl.innerHTML = stories.map(story => `
      <article class="story-card">
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <img src="${story.photoUrl}" alt="Foto ${story.name}" width="100" />
      </article>
    `).join('');

    // Hapus peta sebelumnya jika sudah ada
    if (window._leaflet_map) {
      window._leaflet_map.remove();
    }

    // Inisialisasi ulang peta
    const map = L.map('map').setView([0, 0], 2);
    window._leaflet_map = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const bounds = [];

    stories.forEach(story => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon]).addTo(map);
        marker.bindPopup(`<b>${story.name}</b><br>${story.description}`);
        bounds.push([story.lat, story.lon]);
      }
    });

    // Auto-zoom ke semua marker
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  },

  /**
   * Pasang event listener submit form
   * @param {Function} submitHandler - Fungsi callback saat submit form
   */
  initSubmitListener(submitHandler) {
    const form = document.getElementById('storyForm');
    const feedback = document.getElementById('form-feedback');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const lat = parseFloat(document.getElementById('latInput').value);
      const lon = parseFloat(document.getElementById('lonInput').value);

      if (isNaN(lat) || isNaN(lon)) {
        feedback.textContent = "Latitude dan Longitude harus berupa angka yang valid.";
        return;
      }

      const formData = {
        name: document.getElementById('nameInput').value,
        description: document.getElementById('descriptionInput').value,
        photoUrl: document.getElementById('photoUrlInput').value,
        lat,
        lon,
      };

      submitHandler(formData);
      form.reset();
      feedback.textContent = "Cerita berhasil ditambahkan!";
    });
  },

  /**
   * Render error message di container utama
   * @param {string} message - Pesan error
   */
  renderError(message) {
    const container = document.getElementById('main');
    container.innerHTML = `<p class="error" aria-live="assertive">${message}</p>`;
  }
};

export default HomeView;
