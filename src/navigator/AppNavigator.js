import { createStackNavigator, createAppContainer } from 'react-navigation';
import React from "react";
import {
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { APPBAR_HEIGHT, STATUSBAR_HEIGHT } from '../constant/PlatformConstant';
import images from '../resource/images';

import Home from '../screens/Home';
import LoginScreen from "../screens/Home/LoginScreen/LoginScreen";
import SignUpScreen from "../screens/Home/SignUpScreen/SignUpScreen";

const routeConfigs = {
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
    },
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      title: 'Sign Up',
    },
  },
};

const stackNavigatorConfig = {
  initialRouteName: 'Home',
  headerMode: 'screen',
  cardStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;

      const index = scene.index;

      const width = layout.initWidth;
      let translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });

      const ignoreTransitionRouteNames = [
        'Home',
      ];
      // 移除过场动画，优化体检
      if (ignoreTransitionRouteNames.includes(scene.route.routeName)) {
        translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0, 0, 0],
        });
      }

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return {
        opacity,
        transform: [{ translateX }],
      };
    },
  }),
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: 'red',
      paddingTop: STATUSBAR_HEIGHT,
      height: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
      elevation: 0,
    },
    headerTitleStyle: {
      color: '#ffffff',
      fontWeight: 'normal',
    },
    headerLeft: (
      <TouchableOpacity
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          width: APPBAR_HEIGHT,
          height: APPBAR_HEIGHT,
        }}
        onPress={() => {
          setTimeout(() => {
            navigation.goBack();
          }, 0);
        }}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={images.ic_menu_back}
        />
      </TouchableOpacity>
    ),
  }),
};

const AppNavigator = createStackNavigator(routeConfigs, stackNavigatorConfig);

export default createAppContainer(AppNavigator);
