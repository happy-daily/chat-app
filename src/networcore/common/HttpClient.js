import querystring from 'querystring';
import Response from "./Response";

export default class HttpClient {
  constructor(baseUrl, {
    onRequest,
    onSuccess,
    onError,
  }) {
    this.baseUrl = baseUrl;
    this.onRequest = onRequest;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  post(path, body) {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
    };
    return this.request(path, null, options);
  }

  get(path, params) {
    const options = {
      method: 'GET',
    };
    return this.request(path, params, options);
  }

  async request(path, params, rawOptions) {
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    const strParams = querystring.encode(params);
    let url = this.baseUrl.url + path + strParams;
    let options = rawOptions;
    options.headers = {};
    if (this.onRequest) {
      const args = this.onRequest(url, options);
      url = args.url;
      options = args.options;
    }

    let response = null;
    try {
      response = await fetch(url, options);
      if (response.ok) {
        let res = await Response.parse(response);
        if (this.onSuccess) {
          res = this.onSuccess(res);
        }
        return res;
      }
      throw new Error();
    } catch (error) {
      const err = await Response.parseError({ url, options }, response, error.message);
      if (this.onError) {
        this.onError(err);
      } else {
        throw err;
      }
    }
  }
}
