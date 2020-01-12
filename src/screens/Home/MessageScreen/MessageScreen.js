import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, DeviceEventEmitter, FlatList } from 'react-native';
import GlobalInfo, { User, USER_INFO } from "../../../utils/GlobalInfo";
import {LOGIN_STATE_CHANGE} from "../../../constant/Constants";
import Loading from "../../../components/Loading";
import PersonalScreenStore from "./MessageScreenStore";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import {TextInputComp} from "../../../components";
import SBSingleInstance from "../../../utils/SBSingleInstance";
import { WINDOW_HEIGHT } from '../../../constant/PlatformConstant';

const TAG = "[Message]"

@observer
export default class MessageScreen extends Component {
  userInfo: User = null;

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.channel.name,
    }
  };

  constructor(props) {
    super(props);
    this.store = new PersonalScreenStore(this.props.navigation.state.params);
    this.store.loadMsg();
    this.sb = SBSingleInstance.getInstance();
  }

  componentDidMount(): void {
    // this.sb.OpenChannel.getChannel(this.channel.url, (openChannel, error) => {
    //   if (error) {

    //   }
    // });
    this.store.channel.enter((response, error) => {
      if (error) {
        console.log(error.message);
        return;
      }
      console.log(`${TAG}: enter channel success`);
    });
  }

  renderSendMsgView() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInputComp
          ref={comp => this.inputRef = comp}
          onChangeText={(text: string) => {
            this.store.setMessage(text);
          }}
          placeholder={'Input your message'}
          style={{ margin: 5, flex: 1 }}
        />
        <TouchableOpacity
          style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            const params = new this.sb.UserMessageParams();
            params.message = this.store.message;
            params.mentionType = 'users';
            this.store.sendMsg(params);
            this.inputRef.clear();
          }}
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderMsgItem = ({ item, index }) => {
    const isMine = item._sender.userId === this.store.userInfo.userId;
    console.log(`[isMine]: ${item._sender.profileUrl},  ${this.store.userInfo.profileUrl}`);

    let content
    if (isMine) {
      content = 
      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={{ marginRight: 10 }}>{item.message}</Text>
        <Image 
          style={{ height: 35, width: 35, borderRadius: 35/2 }}  
          source={{
            uri: isMine ? this.store.userInfo.profileUrl : item._sender.profileUrl
          }}
        />
      </View>
    } else {
      content =
      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Image 
          style={{ height: 35, width: 35, borderRadius: 35/2 }}  
          source={{
            uri: isMine ? this.store.userInfo.profileUrl : item._sender.profileUrl
          }}
        />
        <Text style={{ marginLeft: 10 }}>{item.message}</Text>
      </View>
    }
    return content;
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#ffffff'
      }}>
        <View style={{ flex: 1 }}>
          <FlatList
            ListEmptyComponent={
              <View style={{justifyContent: 'flex-start', alignItems: 'center', padding: 10 }}>
                <Text>{this.store.refreshing ? `Loading...` : `No more data...`}</Text>
              </View> 
            }
            inverted
            refreshing={this.store.refreshing}
            keyExtractor={(item, index) => item.messageId + ''}
            data={toJS(this.store.msgList)}
            renderItem={this.renderMsgItem}
          />
        </View>
        {this.renderSendMsgView()}
      </View>
    );
  }
}
