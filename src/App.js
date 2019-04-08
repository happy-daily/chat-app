import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './navigator';

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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
