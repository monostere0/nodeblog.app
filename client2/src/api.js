const BASE_URL =
  'https://xsbnh3bks5.execute-api.eu-central-1.amazonaws.com/prod';

class API {
  async getArticles() {
    return await this.request('articles');
  }

  async createArticle(body) {
    await this.request('articles', body);
  }

  async getArticle(slug) {
    return await this.request(`articles/${slug}`);
  }

  async request(path, body) {
    const options = body && {
      method: 'POST',
      body: JSON.stringify(body),
    };
    const response = await fetch(`${BASE_URL}/${path}`, options);
    const jsonBody = await response.json();
    return jsonBody;
  }
}

module.exports = new API();
