import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StatusBar, FlatList, Image, DeviceEventEmitter} from 'react-native';
import {observer} from 'mobx-react/native';
import ChatScreenStore from "./ChatScreenStore";
import Network from '../../../network';

import * as Facebook from 'expo-facebook';
import {toJS} from "mobx";
import {LOGIN_STATE_CHANGE} from "../../../constant/Constants";

@observer
export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.store = new ChatScreenStore();
    this.store.initData();
  }

  componentDidMount(): void {
    DeviceEventEmitter.addListener(LOGIN_STATE_CHANGE, ({ login, userInfo }: { login: boolean, userInfo: User }) => {
      this.store.setLogin(login);
      if (login) {
        this.store.initData()
      }
    });
  }

  componentWillUnmount(): void {
    DeviceEventEmitter.removeListener(LOGIN_STATE_CHANGE);
  }

  renderButton() {

  }

  renderChannel = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('MessageScreen', {
            channel: item,
          });
          // this.store.getChannel(item.url)
        }}
        style={{
          margin: 10,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={{uri: item.coverUrl}}
          style={{ width: 70, height: 70 }}
        />
        <Text style={{ marginLeft: 10, color: '#333333', fontSize: 16 }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  };

  render() {
    const {navigation} = this.props;
    let content;
    if (this.store.login) {
      content =
        <FlatList
          onRefresh={() => {
            this.store.connectUser(this.store.userInfo.userId);
            this.store.getOpenChannelList();
          }}
          refreshing={this.store.refreshing}
          keyExtractor={(item, index) => item.url}
          data={toJS(this.store.openChannelList)}
          renderItem={this.renderChannel}
        />
    } else {
      content = <View style={{flex: 1, alignItems: 'center', paddingTop: 50, paddingHorizontal: 60}}>
        <Text style={{fontWeight: 'bold', fontSize: 26, minWidth: 150}}>Start a Chat</Text>
        <Text style={{fontSize: 16, textAlign: 'center', marginTop: 20}}>
          Make new friends in a realtime one-on-one chat, Get matched, introduce yourself and chat, Afterwards, send an
          invite if you want to stay connected
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 40,
            width: 200,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'tomato',
            borderRadius: 5,
          }}
          onPress={async () => {
            navigation.navigate('Login');
          }}
        >
          <Text style={{color: '#ffffff'}}>Chat Now</Text>
        </TouchableOpacity>
      </View>;
    }
    return (
      <View style={{ flex: 1 }}>
        {content}
      </View>
    );
  }
}
