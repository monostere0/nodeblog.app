const BASE_URL =
  'https://xsbnh3bks5.execute-api.eu-central-1.amazonaws.com/prod';

class API {
  public async getArticles() {
    const response = await this.request('articles');
    return response;
  }

  public async createArticle(body: unknown) {
    await this.request('articles', body);
  }

  private async request(path: string, body?: any): Promise<unknown> {
    const options = body && {
      method: 'POST',
      body: JSON.stringify(body),
    };
    const response = await fetch(`${BASE_URL}/${path}`, options);
    const jsonBody = await response.json();
    return jsonBody;
  }
}

export default new API();
