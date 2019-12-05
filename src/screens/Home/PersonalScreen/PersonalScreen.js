import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import GlobalInfo, { User, USER_INFO } from "../../../utils/GlobalInfo";
import {LOGIN_STATE_CHANGE} from "../../../constant/Constants";
import Loading from "../../../components/Loading";
import PersonalScreenStore from "./PersonalScreenStore";
import {observer} from "mobx-react";

@observer
export default class PersonalScreen extends Component {
  userInfo: User = null;

  constructor(props) {
    super(props);
    this.store = new PersonalScreenStore();
  }

  componentDidMount(): void {
    DeviceEventEmitter.addListener(LOGIN_STATE_CHANGE, ({ login, userInfo }) => {
      if (login) {
        this.store.initData();
      }
    });
  }

  renderHeader() {
    const { navigation } = this.props;
    return (
      <View style={{ height: 60, justifyContent: 'center', width: '100%' }}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-end', padding: 10 }}
          onPress={() => {
            this.store.logOut();
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let content;
    if (this.store.login) {
      content = (
        <View style={{ flex: 1, alignItems: 'center' }}>
          {this.renderHeader()}
          <Image
            source={{ uri: this.store.userInfo.profileUrl }}
            style={{ width: 80, height: 80, marginTop: 100 }}
          />
          <Text style={{ fontSize: 18, marginTop: 20 }}>{this.store.userInfo.nickname}</Text>
          <Text style={{ fontSize: 18, marginTop: 20 }}>{this.store.userInfo.userId}</Text>
          <Loading visible={this.store.visible} />
        </View>
      );
    } else {
      content = (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>You are not login</Text>
        </View>
      );
    }
    return content;
  }
}
