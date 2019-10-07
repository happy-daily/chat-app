import {observable, action} from 'mobx';
import SendBird from "sendbird";
import { SEND_BIRD_APPID } from "../../../constant/Constants";

export default class ChatScreenStore {
  @observable item = [];

  @observable login: boolean = false;

  sb;

  openChannel: SendBird.OpenChannel;

  constructor() {
    this.sb = new SendBird({ appId: SEND_BIRD_APPID });
  }

  connectUser(userId: string) {
    this.sb.connect(userId, (user: SendBird.User, error: SendBird.SendBirdError) => {
      if (error) {
        this.log(error);
      } else {
        this.log(`connect user ${userId}`);
        this.log(user);
      }
    });
  }

  createOpenChannel() {
    this.sb.OpenChannel.createChannel(
      (openChannel: SendBird.OpenChannel, error: SendBird.SendBirdError) => {
        if (error) {
          this.log(error);
        } else {
          this.log('create open channel');
          this.log(openChannel);
          this.openChannel = openChannel;
        }
      },
    );
  }

  getChannel(channelUrl: string) {
    this.sb.getChannel(
      channelUrl,
      (openChannel: SendBird.OpenChannel, error: SendBird.SendBirdError) => {
        if (error) {
          this.log(error);
        } else {
          this.openChannel = openChannel;
        }
      },
    );
  }

  getOpenChannelList() {
    const openChannelListQuery = this.sb.OpenChannel.createOpenChannelListQuery();
    openChannelListQuery.next((openChannels, error) => {
      if (error) {
        return;
      }
      this.log(`Get Open Channel List`);
      this.log(openChannels);
    });
  }

  log(message: string) {
    console.log(`[ChatScreen]: ${JSON.stringify(message, null, 2)}`);
  }
}
