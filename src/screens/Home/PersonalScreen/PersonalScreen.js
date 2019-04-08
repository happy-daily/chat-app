import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class PersonalScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello i'm Personal screen</Text>
      </View>
    )
  }
}
