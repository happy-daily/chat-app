import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import ChatScreen from './ChatScreen';
import PersonalScreen from './PersonalScreen';
import ExploreScreen from "./ExploreScreen";

const routeConfigs = {
  Chat: {
    screen: ChatScreen,
  },
  Explore: {
    screen: ExploreScreen,
  },
  Personal: {
    screen: PersonalScreen,
  },
};

const drawerNavigatorConfig = {
  initialRouteName: 'Chat',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Chat': {
          iconName = `logo-snapchat`;
          break;
        }
        case 'Explore': {
          iconName = `md-search`;
          break;
        }
        case 'Personal': {
          iconName = `md-person`;
          break;
        }
        default: {
          iconName = '';
        }
      }
      return <Icon name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
};

const HomeDrawerNavigator = createBottomTabNavigator(routeConfigs, drawerNavigatorConfig);

export default HomeDrawerNavigator;
