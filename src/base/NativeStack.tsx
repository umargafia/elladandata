import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import MySlider from '../screens/MySlider';

export type RootStackParamList = {
  welcome: undefined;
  slider: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NativeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="slider"
    >
      <Stack.Screen name="slider" component={MySlider} />
      <Stack.Screen name="welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default NativeStack;
