import {
  AppApi,
} from "./App/index";

export default class AppFactory {
  /**
   * 创建请求Api实例
   * @param countryId - 区域代码
   * @param env - 后台环境
   * @param httpConfig - 拦截器配置
   * @returns {BaseApi}
   */
  static create(countryId, env, httpConfig) {
    switch (countryId) {
      case 1:
        return new AppApi({ env, httpConfig });
      default:
        throw new Error('AKAppFactory: unresolved countryId!');
    }
  }
}
