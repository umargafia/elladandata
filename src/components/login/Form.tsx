import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
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
import MyIcon from '../global/MyIcon';
import useCheckFingerPrint from '../../hooks/CheckFingerPrint';

type navProps = NativeStackNavigationProp<RootStackParamList, 'login'>;
const Form = () => {
  const navigation = useNavigation<navProps>();
  const { loginDetails, useFinger } = useCheckFingerPrint();
  const [number, setNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{ num: boolean; pass: boolean }>({
    num: false,
    pass: false,
  });

  const resetInput = (value: string) => {
    setError((prev) => {
      return {
        ...prev,
        [value]: false,
      };
    });
  };

  const validatesInput = () => {
    if (number.trim() === '') {
      setError((prev) => {
        return {
          ...prev,
          num: true,
        };
      });
    }
    if (password.trim() === '') {
      setError((prev) => {
        return {
          ...prev,
          pass: true,
        };
      });
    }
  };
  const handleLogin = () => {
    validatesInput();

    if (number.trim() === '' || password.trim() === '') {
      return;
    }
  };

  return (
    <MyContainer
      style={{
        alignItems: 'center',
        paddingVertical: WindowConstant.width * 0.05,
      }}
    >
      <Heading>Welcome back,</Heading>
      <Heading mb="$3">Umar Musa</Heading>
      <MyInput
        text="Phone Number"
        type="phone-pad"
        icon="call"
        value={number}
        isInvalid={error.num}
        onChange={(e) => {
          resetInput('num');
          setNumber(e.nativeEvent.text);
        }}
      />
      <MyInput
        text="Password"
        password
        value={password}
        icon="lock-closed"
        isInvalid={error.pass}
        helperText="Password should be at least 8 characters"
        onChange={(e) => {
          resetInput('pass');
          setPassword(e.nativeEvent.text);
        }}
      />
      <HStack alignSelf="stretch" mt={'$4'}>
        <Button
          style={styles.button}
          borderRadius={'$md'}
          size="xl"
          mb="$2"
          flex={1}
          bgColor={ColorConstant.primary}
          onPress={handleLogin}
        >
          <ButtonText>Login</ButtonText>
        </Button>

        {useFinger && (
          <Button
            size="xl"
            borderRadius={'$md'}
            bgColor={ColorConstant.primary}
            ml={'$3'}
          >
            <MyIcon name="finger-print" color="white" />
          </Button>
        )}
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
