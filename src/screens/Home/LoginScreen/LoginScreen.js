import React, { Component } from 'react';
import { View, TouchableOpacity, StatusBar, TextInput, Button } from 'react-native';
import { Text, CheckBox } from 'native-base';
import { observer } from 'mobx-react/native';
import LoginScreenStore from "./LoginScreenStore";
import { TextInputComp } from '../../../components';
import Network from '../../../network';

import * as Facebook  from 'expo-facebook';
import Loading from "../../../components/Loading";

@observer
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.store = new LoginScreenStore();
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10, backgroundColor: '#ffffff' }}>
        <View style={{ width: 100, height: 100, backgroundColor: 'red', margin: 10 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Login</Text>
        <TextInputComp
          placeholder={'Please input your user name'}
          onChangeText={(text: string) => {
            this.store.setUserName(text);
          }}
          style={{ marginVertical: 10 }}
        />
        <TextInputComp
          placeholder={'Please input your password'}
          onChangeText={(text: string) => {
            this.store.setPassword(text);
          }}
          style={{ marginVertical: 10 }}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
            <CheckBox
              style={{ marginLeft: -10 }}
              checked={this.store.remember}
              onPress={() => this.store.setRemember(!this.store.remember)}
            />
            <Text style={{ marginLeft: 12, fontSize: 14, color: '#999999' }}>Remember Me</Text>
          </View>
          <View style={{ width: 150 }}>
            <Button
              title={'Login'}
              onPress={() => {
                try {
                  this.store.login();
                  this.props.navigation.popToTop();
                } catch (e) {
                  alert(e.message);
                }
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 100,
            width: 200,
            height: 50,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(47,67,111)',
            margin: 10
          }}
          onPress={async () => {
            try {
              const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
              } = await Facebook.logInWithReadPermissionsAsync('488310225262048', {
                permissions: ['public_profile'],
              });
              console.log(token);
              const loginRes = await Network.post('/facebook/login', {
                access_token: token,
              });
            } catch (err) {
              console.log('-----------fb login err:',err);
            }
          }}
        >
          <Text style={{ color: '#ffffff' }}>Sign Up with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 200,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: 'rgb(47,67,111)',
            margin:10,
          }}
        >
          <Text style={{ color: '#ffffff' }}>Sign Up with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUpScreen")
          }}
          style={{
            width: 200,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: 'rgb(47,67,111)',
            margin:10,
          }}
        >
          <Text style={{ color: '#ffffff' }}>Sign Up</Text>
        </TouchableOpacity>
        <Loading visible={this.store.visible}/>
      </View>
    )
  }
}
