import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, Button, ButtonText, ImageBackground } from '@gluestack-ui/themed';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import MyContainer from '../components/global/MyContainer';
import { Image } from 'expo-image';
import { ColorConstant, WindowConstant } from '../utilities/Theme';
import { RootStackParamList } from '../base/NativeStack';

type navProps = NativeStackNavigationProp<RootStackParamList, 'slider'>;
export default function WelcomeScreen() {
  const navigation = useNavigation<navProps>();

  return (
    <ImageBackground source={require('../../assets/background.png')} flex={1}>
      <ExpoStatusBar style="light" />
      <MyContainer
        padding
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Image source={require('../../assets/logo.png')} style={styles.image} />

        <Box style={{ alignSelf: 'stretch' }}>
          <Button
            bgColor={ColorConstant.primary}
            rounded="$lg"
            onPress={() => console.log('hello')}
          >
            <ButtonText>Login</ButtonText>
          </Button>
          <Button
            bgColor={ColorConstant.primary}
            rounded="$lg"
            onPress={() => console.log('hello')}
          >
            <ButtonText>Register</ButtonText>
          </Button>
          {/* <Mybutton text="login"  color="white" />
          <Mybutton
            text="Register"
            background={theme.palette.primary}
            onPress={navigateToSignup}
            color="white"
          /> */}
        </Box>
      </MyContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: WindowConstant.width > 400 ? 300 : 200,
    resizeMode: 'cover',
  },
});
