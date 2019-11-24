import { observable } from "mobx";
import { DeviceEventEmitter } from 'react-native';
import SendBird from "sendbird";
import {LOGIN_STATE_CHANGE, SEND_BIRD_APPID} from "../../../constant/Constants";
import GlobalInfo from "../../../utils/GlobalInfo";


export default class LoginScreenStore {
  @observable userName: string = '';
  @observable password: string = '';
  @observable remember: boolean = false;

  @observable visible: boolean = false;

  constructor() {

  }

  setUserName(userName: string) {
    this.userName = userName;
    console.log(this.userName);
  }

  setPassword(password: string) {
    this.password = password;
  }

  setRemember(remember: boolean) {
    this.remember = remember;
    console.log(this.remember);
  }

  login() {
    this.visible = true;
    const sb = new SendBird({ appId: SEND_BIRD_APPID });
    sb.connect(this.userName, (user: SendBird.User, error: SendBird.SendBirdError) => {
      this.visible = false;
      GlobalInfo.setUserInfo(user);
      if (error) {
        throw error;
      } else {
        DeviceEventEmitter.emit(LOGIN_STATE_CHANGE, {
          login: true,
          userInfo: user,
        });
      }
    });
  }
}
