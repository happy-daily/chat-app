import {action, observable} from "mobx";
import GlobalInfo, {USER_INFO} from "../../../utils/GlobalInfo";
import {User} from "sendbird";
import {DeviceEventEmitter} from "react-native";
import {LOGIN_STATE_CHANGE} from "../../../constant/Constants";

export default class PersonalScreenStore {

  @observable login = false;

  @observable visible = false;

  userInfo: User = null;

  constructor() {
    this.initData();
  }

  @action
  async logOut() {
    this.visible = true;
    await GlobalInfo.clearUserInfo();
    DeviceEventEmitter.emit(LOGIN_STATE_CHANGE, { login: false, userInfo: null });
    this.login = false;
    this.visible = false;
  }

  @action
  initData() {
    this.userInfo = JSON.parse(GlobalInfo.globalInfo.get(USER_INFO) || "");
    if (this.userInfo && this.userInfo.userId) {
      this.login = true;
    }
  }
}
