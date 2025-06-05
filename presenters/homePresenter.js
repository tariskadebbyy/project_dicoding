import StoryApi from '../data/storyApi.js';

const HomePresenter = {
  async init(view) {
    this._view = view;

    // Cek apakah user sudah login
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.hash = '#/login';
      return;
    }

    this._view.initSubmitListener(this.handleSubmit.bind(this));
    await this.loadStories(token);
  },

  async loadStories(token) {
    try {
      const data = await StoryApi.getStories(token);
      this._view.renderStories(data.listStory);
    } catch (error) {
      this._view.renderError(error.message);
    }
  },

  async handleSubmit(formData) {
    const token = localStorage.getItem('token');
    try {
      await StoryApi.addStory(formData, token);
      await this.loadStories(token);
    } catch (error) {
      this._view.renderError(error.message);
    }
  }
};

export default HomePresenter;
