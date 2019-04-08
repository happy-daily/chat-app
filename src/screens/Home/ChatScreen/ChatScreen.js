import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react/native';
import ChatScreenStore from "./ChatScreenStore";

@observer
export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.store = new ChatScreenStore();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 50, paddingHorizontal: 60 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Start a Chat</Text>
        <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 20 }}>
          Make new friends in a realtime one-on-one chat, Get matched, introduce yourself and chat, Afterwards, send an invite if you want to stay connected
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
          onPress={() => {}}
        >
          <Text style={{ color: '#ffffff' }}>Chat Now</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
