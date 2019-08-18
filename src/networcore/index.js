import AppFactory from './apis/AppFactory';

export default class AKNetworkCore {
  constructor({
    onRequest,
    onSuccess,
    onError,
  }) {
    this.countryId = 1;
    this.env = 'development';
    this.httpConfig = {
      onRequest,
      onSuccess,
      onError,
    };
  }

  /**
   * POST请求
   * @param path - 路径
   * @param body - 请求体
   */
  post(path, body) {
    const appApi = AppFactory.create(this.countryId, this.env, this.httpConfig);
    return appApi.post(path, body);
  }

  /**
   * GET请求
   * @param path - 路径
   * @param params - 查询参数
   */
  get(path, params) {
    const appApi = AppFactory.create(this.countryId, this.env, this.httpConfig);
    return appApi.get(path, params);
  }

  setCountryId(countryId) {
    this.countryId = countryId;
  }

  setEnv(env) {
    this.env = env;
  }
}
