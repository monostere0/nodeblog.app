const BASE_URL =
  'https://xsbnh3bks5.execute-api.eu-central-1.amazonaws.com/prod';

class API {
  public async getArticles() {
    const response = await this.request('articles');
    return response;
  }

  private async request(path: string, body?: any): Promise<unknown> {
    const response = await fetch(`${BASE_URL}/${path}`);
    const jsonBody = await response.json();
    console.log(jsonBody);
    return JSON.parse(jsonBody.body);
  }
}

export default new API();
