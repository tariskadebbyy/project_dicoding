import StoryApi from '../data/storyApi.js';

const AddPresenter = {
  async init(view) {
    this._view = view;
    this._view.bindSubmit(this._handleSubmit.bind(this));
  },

  async _handleSubmit(story) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login ulang.");
      }

      const formData = new FormData();
      formData.append('name', story.name || '');
      formData.append('description', story.description || '');
      formData.append('lat', story.lat || 0);
      formData.append('lon', story.lon || 0);
      if (story.photo) {
        formData.append('photo', story.photo);
      }

      await StoryApi.addStory(formData, token);
      this._view.showSuccessMessage('Cerita berhasil ditambahkan!');
      this._view.navigateToHome();
    } catch (error) {
      this._view.showErrorMessage('Gagal menambahkan cerita: ' + error.message);
    }
  }
};

export default AddPresenter;
