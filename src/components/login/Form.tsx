import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  Button,
  ButtonText,
  HStack,
  Heading,
  Text,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import MyContainer from '../global/MyContainer';
import MyInput from '../global/MyInput';
import { ColorConstant, WindowConstant } from '../../utilities/Theme';
import { RootStackParamList } from '../../base/NativeStack';

type navprops = NativeStackNavigationProp<RootStackParamList, 'login'>;
const Form = () => {
  const navigation = useNavigation<navprops>();
  return (
    <MyContainer
      style={{
        alignItems: 'center',
        paddingVertical: WindowConstant.width * 0.05,
      }}
    >
      <Heading>Welcome back,</Heading>
      <Heading mb="$3">Umar Musa</Heading>
      <MyInput text="Phone Number" type="phone-pad" icon="call" />
      <MyInput
        text="Password"
        password
        icon="lock-closed"
        helperText="Password should be at least 8 characters"
      />
      <HStack alignSelf="stretch" mt={'$4'}>
        <Button
          width="100%"
          style={styles.button}
          borderRadius={10}
          mb="$2"
          bgColor={ColorConstant.primary}
        >
          <ButtonText>Login</ButtonText>
        </Button>
      </HStack>
      <TouchableOpacity onPress={() => navigation.navigate('forgetPassword')}>
        <HStack>
          <Text>Forgot your password?</Text>
          <Text color="$blue500"> Recover</Text>
        </HStack>
      </TouchableOpacity>
    </MyContainer>
  );
};

export default Form;

const styles = StyleSheet.create({
  button: {},
});
