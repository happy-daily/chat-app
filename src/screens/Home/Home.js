import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import PersonalScreen from './PersonalScreen';
import ExploreScreen from "./ExploreScreen";

const routeConfigs = {
  Home: {
    screen: HomeScreen,
  },
  Explore: {
    screen: ExploreScreen,
  },
  Personal: {
    screen: PersonalScreen,
  }
};

const drawerNavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      switch (routeName) {
        case 'Home': {
          iconName = `md-information-circle${focused ? '' : '-outline'}`;
          break;
        }
        case 'Explore': {
          iconName = `md-add-circle-outline`;
          break;
        }
        case 'Personal': {
          iconName = `md-heart`;
        }
      }
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
};

const HomeDrawerNavigator = createBottomTabNavigator(routeConfigs, drawerNavigatorConfig);

export default HomeDrawerNavigator;
