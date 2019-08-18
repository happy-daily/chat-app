import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { observer } from 'mobx-react/native';
import ChatScreenStore from "./ChatScreenStore";
import Network from '../../../network';

import * as Facebook  from 'expo-facebook';

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
          onPress={async () => {
            try {
              // const {
              //   type,
              //   token,
              //   expires,
              //   permissions,
              //   declinedPermissions,
              // } = await Facebook.logInWithReadPermissionsAsync('488310225262048', {
              //   permissions: ['public_profile'],
              // });
              const loginRes = await Network.post('/facebook/login', {
                access_token: 'EAAG8HZAWEVeABAOtB3NlEal4G0e453k8kW6cdWRlDLdFAFK9CpQJaIn4AaJsHoARsdpROy45gzHu4yQUjlTZB9AHkgnoBK38n1T9Fqp5CYETuI9wE8CXE2hXwMs3uEgyUpYFxI5Td3L4PlsRERZBlLRKDxcEvYFQoAmOxjTgbMTeOLZADJ0zzFfKxICIDDnWDzwC2MWG9ZBJs3ZCIj4rCKLgsmTBks3m8ZD',
              });
            } catch (err) {
              console.log('-----------fb login err:',err);
            }
          }}
        >
          <Text style={{ color: '#ffffff' }}>Chat Now</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
