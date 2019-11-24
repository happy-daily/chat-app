import { DeviceEventEmitter } from 'react-native';
import { action, observable } from "mobx";
import Network from '../../../network';
import GlobalInfo from "../../../utils/GlobalInfo";
import {LOGIN_STATE_CHANGE} from "../../../constant/Constants";

export default class SignUpScreenStore {
  @observable userName: string = '';
  @observable userId: string = '';

  @observable visible: boolean = false;

  @action
  setUserName(userName: string) {
    this.userName = userName;
  }

  @action
  setUserId(userName: string) {
    this.userId = userName;
  }

  @action
  toggleVisible() {
    this.visible = !this.visible;
  }

  async signUp() {
    try {
      const res = await Network.post("/v3/users", {
        user_id: this.userId,
        nickname: this.userName,
        profile_url: 'https://sendbird.com/main/img/profiles/profile_05_512px.png',
      });
      this.log(res);

      GlobalInfo.setUserInfo({
        userId: res.data.user_id,
        nickname: res.data.nickname,
        profileUrl: res.data.profile_url,
      });
      DeviceEventEmitter.emit(LOGIN_STATE_CHANGE, {
        login: true,
        userInfo: res.data,
      });
    } catch (e) {
      this.log(e.message);
      throw e;
    }
  }

  log(message: string) {
    console.log(`[SignUpScreen]: ${JSON.stringify(message, null, 2)}`);
  }
}
