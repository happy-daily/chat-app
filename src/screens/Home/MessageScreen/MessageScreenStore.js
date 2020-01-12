import {action, observable} from "mobx";
import { UserMessageParams } from 'sendbird';
import GlobalInfo from "../../../../src/utils/GlobalInfo";
const TAG = "[MessageStore]"

export default class MessageScreenStore {
  @observable message: string = '';
  @observable refreshing: boolean = false;
  @observable msgList = [];

  channel;
  userInfo = JSON.parse(GlobalInfo.globalInfo.get("USER_INFO"));

  constructor(params) {
    this.channel = params.channel;
    console.log(`[userInfo]: ${this.userInfo}`);
  }
  
  @action
  loadMsg() {
    this.refreshing = true;
    let messageListQuery = this.channel.createPreviousMessageListQuery();
    messageListQuery.limit = 30;
    messageListQuery.reverse = true;
    messageListQuery.load((messageList, error) => {
      this.refreshing = false;
      if (error) {
        console.log(error.message);
        // TODO error
      }
      this.msgList = this.msgList.concat(messageList);
      console.log(`${TAG}: get msg list success \n ${JSON.stringify(messageList, null, 2)}`);
    });
  }

  @action
  sendMsg(params: UserMessageParams) {
    this.channel.sendUserMessage(params, (message, error) => {
      if (error) {
        console.log(error.message);
        return;
      }
      console.log(`${TAG}: send msg success \n ${JSON.stringify(message, null, 2)}`);
      this.msgList.unshift(message);
    });
  }

  @action
  setMessage(message: string) {
    this.message = message;
  }
}
