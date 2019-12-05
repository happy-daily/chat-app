import SendBird, { SendBirdInstance } from "sendbird";
import { SEND_BIRD_APPID } from "../constant/Constants";

export default class SBSingleInstance {
  static SBInstance: SendBirdInstance = null;

  static getInstance() {
    if (this.SBInstance === null) {
      this.SBInstance = new SendBird({ appId: SEND_BIRD_APPID });
      return this.SBInstance;
    }
    return this.SBInstance;
  }
}
