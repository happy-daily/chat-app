import { BaseUrl, BaseApi } from "../../common";
import { HOST_STG_ID, HOST_PRD_ID } from '../../constant/HostConstant';

export default class AppApi extends BaseApi {
  constructor({ env, httpConfig }) {
    super({ env, httpConfig });
  }

  getBaseUrl(env) {
    const host = env === 'development' ? HOST_STG_ID : HOST_PRD_ID;
    const schema = 'http';
    return new BaseUrl({ schema, host });
  }
}
