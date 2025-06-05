const BASE_URL = 'https://story-api.dicoding.dev/v1';

const StoryApi = {
  async getStories(token) {
    try {
      const response = await fetch(`${BASE_URL}/stories`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Gagal mengambil data: ' + response.statusText);
      return await response.json();
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      throw new Error('Gagal mengambil data');
    }
  },

  async addStory(formData, token) {
    try {
      const response = await fetch(`${BASE_URL}/stories`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      if (!response.ok) throw new Error('Gagal menambah data: ' + response.statusText);
      return await response.json();
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      throw new Error('Gagal menambah data');
    }
  }
};

export default StoryApi;
