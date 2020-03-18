import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  Profile,
  Saved,
  Search,
  Initial,
} from './screens';

const Auth = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  },
);

const Protected = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            name="dashboard"
            size={26}
            color={focused ? tintColor : '#c1b9dc'}
          />
        ),
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            name="search"
            size={26}
            color={focused ? tintColor : '#c1b9dc'}
          />
        ),
      },
    },
    Saved: {
      screen: Saved,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            name="favorite"
            size={26}
            color={focused ? tintColor : '#c1b9dc'}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            name="account-circle"
            size={26}
            color={focused ? tintColor : '#c1b9dc'}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Dashboard',
    barStyle: { backgroundColor: '#694fad' },
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Initial,
    Auth,
    Protected,
  },
  {
    initialRouteName: 'Initial',
  },
);

export default createAppContainer(AppNavigator);
