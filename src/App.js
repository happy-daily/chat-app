import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './navigator';
import CodePush from "react-native-code-push";

// @CodePush({
//   deploymentKey: 'PmX58TvxBWxJPxQFDpP3F0J5jR8hdea028f0-5af8-41e6-a17d-64eecef7e734',
//   installMode: CodePush.InstallMode.IMMEDIATE
// })
export default class App extends Component {
  render() {
    return (
      <AppNavigator
        ref={(nav) => {
          this.navigator = nav;
          global.NAVIGATOR = nav;
        }}
        onNavigationStateChange={(prevState, currentState) => {
          console.log('-------------Navigation Params----------');
          console.log(`routeName: ${currentState.routes[currentState.index].routeName}`);
          console.log(currentState.routes[currentState.index].params);
          console.log('----------------------------------------');
          global.CURRENT_ROUTE_NAME = currentState.routes[currentState.index].routeName;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
