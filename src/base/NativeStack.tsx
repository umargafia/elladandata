import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import MySlider from '../screens/MySlider';
import Login from '../screens/Login';
import ErrorPage from '../screens/ErrorPage';
import ForgetPassword from '../screens/ForgetPassword';
import Home from '../screens/Home';

export type RootStackParamList = {
  welcome: undefined;
  slider: undefined;
  login: undefined;
  signup: undefined;
  error: undefined;
  forgetPassword: undefined;
  home: { phone: string; password: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NativeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="welcome"
    >
      <Stack.Screen name="slider" component={MySlider} />
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="error" component={ErrorPage} />
      <Stack.Screen name="forgetPassword" component={ForgetPassword} />
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};

export default NativeStack;
