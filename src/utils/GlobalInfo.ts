import { AsyncStorage } from "react-native";
import { User } from "sendbird";

export interface MetaData {
  location: string,
  marriage: string,
  hasSomeone: string
}

export interface BackendUser {
  "user_id": "Jacob",
  "nickname": "Asty",
  "profile_url": "https://sendbird.com/main/img/profiles/profile_05_512px.png",
  "access_token": "07a0ccf6d3e801223e65b06b6066352e0512b43c",
  "session_tokens": [
    {
      "session_token": "0b39975b05f0dd90cc602103356d7ab2d3f1382e",
      "expires_at": 1542945056625
    }
  ],
  is_online: boolean,
  last_seen_at: number,
  discovery_keys: Array<string>,
  has_ever_logged_in: boolean,
  metadata?: MetaData
}


export const USER_INFO = "USER_INFO";

export default class GlobalInfo {
  static globalInfo: Map<string, any> = new Map();

  static async init() {
    this.setUserInfo(JSON.parse(await this.getUserInfo()));
  }

  static setUserInfo(user: User) {
    let userStr: any = user;
    if (typeof user !== 'string') {
      userStr = JSON.stringify(user);
    }
    this.globalInfo.set(USER_INFO, userStr);
    AsyncStorage.setItem(USER_INFO, userStr);
  }

  // static setNickName(nickname) {
  //   this.globalInfo.set("USER_NICK_NAME", nickname);
  //   AsyncStorage.setItem("USER_NICK_NAME", nickname);
  // }
  //
  // static setUserId(userId) {
  //   this.globalInfo.set("USER_ID", userId);
  //   AsyncStorage.setItem("USER_ID", userId);
  // }

  // static getNickName() {
  //   let nickname = this.globalInfo.get("USER_NICK_NAME");
  //   if (!nickname) {
  //     nickname = AsyncStorage.getItem("USER_NICK_NAME");
  //   }
  //   return nickname;
  // }
  //
  // static getUserId() {
  //   let userId = this.globalInfo.get("USER_ID");
  //   if (!userId) {
  //     userId = AsyncStorage.getItem("USER_ID");
  //   }
  //   return userId;
  // }

  static async getUserInfo() {
    let userInfo = this.globalInfo.get(USER_INFO);
    if (!userInfo) {
      userInfo = await AsyncStorage.getItem(USER_INFO);
    }
    return userInfo;
  }

  static async clearUserInfo() {
    this.globalInfo.delete(USER_INFO);
    await AsyncStorage.removeItem(USER_INFO);
  }
}
