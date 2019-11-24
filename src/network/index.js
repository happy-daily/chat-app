

import NetworkCore from "../networkcore/index";

let holder = null;

class AKNetwork {
  constructor() {
    this.AKNetCore = new NetworkCore({
      onRequest: this.onRequest,
      onSuccess: this.onSuccess,
      onError: this.onError,
      countryId: 1,
      env: 'development',
    });
  }

  static getInstance() {
    if (holder === null) {
      holder = new AKNetwork();
    }
    return holder;
  }

  post(path, body) {
    return this.AKNetCore.post(path, body);
  }

  get(path, params) {
    return this.AKNetCore.get(path, params);
  }

  setCountryId(countryId) {
    return this.AKNetCore.setCountryId(countryId);
  }

  setEnv(env) {
    return this.AKNetCore.setEnv(env);
  }

  /**
   * 请求拦截器
   * @param url - 请求url
   * @param options - 请求报文，包括method，body，headers
   * @returns {{url: *, options: *}}
   */
  onRequest(url, options) {
    options.headers['Content-Type'] = 'application/json';
    // options.headers['Accept-Language'] = 'cn';
    // options.headers['vc'] = 'cn';
    // options.headers['dt'] = 'cn';
    // options.headers['X-AD-ID'] = 'cn';
    // options.headers['X-ADJUST-ID'] = 'cn';
    console.log('---------------onRequest--------------');
    console.log(url);
    console.log(JSON.stringify(options, null, 2));
    return {
      url,
      options,
    };
  }

  /**
   * 请求成功拦截器
   * @param response - 返回报文结构体
   * @returns Response
   */
  onSuccess(response) {
    console.log('------------onResponse-----------');
    console.log(JSON.stringify(response, null, 2));
    return response;
  }

  /**
   * 请求失败拦截器
   * @param error - 错误信息
   */
  onError(error) {
    console.log('--------------onError---------------');
    console.log(JSON.stringify(error, null, 2));
    throw error;
  }
}

export default AKNetwork.getInstance();
