import HttpClient from './HttpClient';

export default class BaseApi {
  constructor({ env, httpConfig }) {
    this.http = new HttpClient(this.getBaseUrl(env), httpConfig);
  }

  getBaseUrl() {
    throw new Error('BaseApi: need implement getBaseUrl !');
  }

  post(path, body) {
    return this.http.post(path, body);
  }

  get(path, params) {
    return this.http.get(path, params);
  }
}