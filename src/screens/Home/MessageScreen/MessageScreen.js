import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import GlobalInfo, { User, USER_INFO } from "../../../utils/GlobalInfo";
import {LOGIN_STATE_CHANGE} from "../../../constant/Constants";
import Loading from "../../../components/Loading";
import PersonalScreenStore from "./MessageScreenStore";
import {observer} from "mobx-react";
import {TextInputComp} from "../../../components";
import SBSingleInstance from "../../../utils/SBSingleInstance";

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
    this.store = new PersonalScreenStore();
    this.channel = this.props.navigation.state.params.channel;
    let messageListQuery = this.channel.createPreviousMessageListQuery();
    messageListQuery.limit = 30;
    messageListQuery.reverse = true;
    messageListQuery.load((messageList, error) => {
      if (error) {
        // TODO error
      }
      console.log(`[Message]: ${messageList}`);
    })
  }

  componentDidMount(): void {
  }

  renderSendMsgView() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInputComp
          onChangeText={(text: string) => {
            this.store.setMessage(text);
          }}
          placeholder={'Input your message'}
          style={{ margin: 5, flex: 1 }}
        />
        <TouchableOpacity
          style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            const params = new SBSingleInstance.getInstance().UserMessageParams();
            params.message = this.store.message;
            params.mentionType = 'users';
          }}
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#ffffff'
      }}>
        <View style={{ flex: 1 }}>
          <Text>Hello i'm Message Screen</Text>
        </View>
        {this.renderSendMsgView()}
      </View>
    );
  }
}
