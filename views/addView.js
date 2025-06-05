import L from 'leaflet';

const AddView = {
  async render(container) {
    container.innerHTML = `
      <a href="#main" class="skip-link">Lewati ke konten utama</a>
      <main id="main" role="main">
          <section aria-labelledby="add-story" class="form-container" role="region" aria-describedby="form-feedback">
          <h2 id="add-story">Tambah Cerita</h2>
          <form id="add-form" aria-label="Form Tambah Cerita">
            <div>
              <label for="name">Nama:</label>
              <input id="name" name="name" required />
            </div>
            <div>
              <label for="description">Deskripsi:</label>
              <textarea id="description" name="description" required></textarea>
            </div>
            <div>
              <label for="photo">Foto:</label>
              <input id="photo" type="file" accept="image/*" capture="environment" required />
            </div>
            <div>
              <label for="lat">Latitude:</label>
              <input id="lat" name="lat" readonly required />
            </div>
            <div>
              <label for="lon">Longitude:</label>
              <input id="lon" name="lon" readonly required />
            </div>
            <button type="submit">Kirim</button>
          </form>

          <div id="form-feedback" aria-live="polite" style="margin-top: 1rem;"></div>
          <div id="map" style="height: 400px; margin-top: 1rem;" aria-label="Peta lokasi cerita"></div>
        </section>
      </main>
    `;

    // ✅ Hindari error "Map container is already initialized"
    const mapContainer = L.DomUtil.get('map');
    if (mapContainer && mapContainer._leaflet_id != null) {
      mapContainer._leaflet_id = null;
    }

    // ✅ Inisialisasi peta
    const map = L.map('map').setView([-6.2, 106.8], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // ✅ Tambahkan marker saat klik di peta
    let marker = null;
    map.on('click', function (e) {
      const { lat, lng } = e.latlng;
      document.getElementById('lat').value = lat;
      document.getElementById('lon').value = lng;

      if (marker) marker.remove();
      marker = L.marker([lat, lng]).addTo(map);
    });
  },

  bindSubmit(handler) {
    const form = document.getElementById('add-form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const story = {
        name: form.name.value,
        description: form.description.value,
        lat: form.lat.value,
        lon: form.lon.value,
        photo: form.photo.files[0]
      };

      try {
        await handler(story);
        feedback.textContent = "Cerita berhasil ditambahkan!";
        form.reset();
      } catch (error) {
        feedback.textContent = "Terjadi kesalahan. Coba lagi.";
      }

      // ❌ Nonaktifkan akses kamera (opsional untuk browser tertentu)
      const input = document.getElementById('photo');
      if (input && input.srcObject) {
        const tracks = input.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        input.srcObject = null;
      }
    });
  },

  showSuccessMessage(message) {
    alert(message);
  },

  showErrorMessage(message) {
    alert(message);
  },

  navigateToHome() {
    window.location.hash = '#/home';
  }
};

export default AddView;
