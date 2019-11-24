import { observable, action } from 'mobx';
import SendBird, {User} from "sendbird";
import { SEND_BIRD_APPID } from "../../../constant/Constants";
import GlobalInfo from "../../../utils/GlobalInfo";

export default class ChatScreenStore {
  @observable item = [];

  @observable login: boolean = false;

  @observable openChannelList: Array<SendBird.OpenChannel> = [];

  @observable user;

  @observable refreshing = false;

  sb;

  openChannel: SendBird.OpenChannel;

  userInfo: User = null;

  constructor() {
    this.sb = new SendBird({ appId: SEND_BIRD_APPID });
  }

  @action
  async initData() {
    this.userInfo = JSON.parse(await GlobalInfo.getUserInfo());
    if (this.userInfo) {
      this.log(JSON.stringify(this.userInfo));
      try {
        this.connectUser(this.userInfo.userId);
        this.getOpenChannelList();
        this.login = true;
      } catch (e) {
        this.login = false;
        alert(e.message());
      }
    }
  }

  @action
  setLogin(login: boolean) {
    this.login = login;
  }

  connectUser(userId: string) {
    this.sb.connect(userId, (user: SendBird.User, error: SendBird.SendBirdError) => {
      if (error) {
        this.login = false;
        this.log(error);
        throw error;
      } else {
        this.log(`connect user ${userId}`);
        this.log(user);
        this.user = user;
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

  }

  @action
  getOpenChannelList() {
    this.refreshing = true;
    const openChannelListQuery = this.sb.OpenChannel.createOpenChannelListQuery();
    openChannelListQuery.next((openChannels, error) => {
      this.refreshing = false;
      if (error) {
        throw error;
      }
      this.log(`Get Open Channel List`);
      this.log(openChannels);
      this.openChannelList = openChannels;
    });
  }

  log(message: any) {
    console.log(`[ChatScreen]: ${JSON.stringify(message, null, 2)}`);
  }
}
