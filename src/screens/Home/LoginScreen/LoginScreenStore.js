import { observable } from "mobx";
import { DeviceEventEmitter } from 'react-native';
import SendBird from "sendbird";
import {LOGIN_STATE_CHANGE, SEND_BIRD_APPID} from "../../../constant/Constants";
import GlobalInfo from "../../../utils/GlobalInfo";
import SBSingleInstance from "../../../utils/SBSingleInstance";


export default class LoginScreenStore {
  @observable userId: string = '';
  @observable password: string = '';
  @observable remember: boolean = false;

  @observable visible: boolean = false;

  constructor() {

  }

  setUserName(userId: string) {
    this.userId = userId;
    console.log(this.userId);
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
    const sb = SBSingleInstance.getInstance();
    sb.connect(this.userId, (user: SendBird.User, error: SendBird.SendBirdError) => {
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
