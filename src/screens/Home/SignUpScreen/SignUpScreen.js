import React, { Component } from 'react';
import { View, TouchableOpacity, StatusBar, TextInput, Button, Modal, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react/native';
import SignUpScreenStore from "./SignUpScreenStore";
import { TextInputComp } from '../../../components';
import GlobalInfo from "../../../utils/GlobalInfo";
import Loading from "../../../components/Loading";

@observer
export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.store = new SignUpScreenStore();
  }

  componentDidMount(): void {
    // GlobalInfo.setNickName("Halo");
    // GlobalInfo.setUserId("666888");
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10, backgroundColor: '#ffffff' }}>
        <TextInputComp
          placeholder={'Please input your user name'}
          onChangeText={(text: string) => {
            this.store.setUserName(text);
          }}
          style={{ marginVertical: 10 }}
        />
        <TextInputComp
          placeholder={'Please input your user ID'}
          onChangeText={(text: string) => {
            this.store.setUserId(text);
          }}
          style={{ marginVertical: 10 }}
        />
        <View style={{
          width: 200,
          height: 50,
          marginTop: 200
        }}>
          <Button
            title={'Sign Up'}
            onPress={async () => {
              this.store.toggleVisible();
              try {
                await this.store.signUp();
                this.props.navigation.popToTop();
              } catch (e) {
                alert(e.message);
              } finally {
                this.store.toggleVisible();
              }
            }}
          />
        </View>
        <Loading
          visible={this.store.visible}
        />
      </View>
    )
  }
}
