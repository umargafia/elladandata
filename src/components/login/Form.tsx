import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonText,
  HStack,
  Heading,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import MyContainer from '../global/MyContainer';
import MyInput from '../global/MyInput';
import { ColorConstant, WindowConstant } from '../../utilities/Theme';
import { RootStackParamList } from '../../base/NativeStack';
import MyIcon from '../global/MyIcon';
import useCheckFingerPrint from '../../hooks/CheckFingerPrint';
import { sendPostRequest } from '../../utilities/Api';
import { useToast } from '@gluestack-ui/themed';

type navProps = NativeStackNavigationProp<RootStackParamList, 'login'>;

type responseProp = {
  msg?: string;
  status?: 'success' | 'invalid';
  name?: string;
  phone?: string;
};
const Form = () => {
  const navigation = useNavigation<navProps>();
  const { loginDetails, useFinger } = useCheckFingerPrint();
  const [number, setNumber] = useState<string | undefined>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{ num: boolean; pass: boolean }>({
    num: false,
    pass: false,
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const resetInput = (value: string) => {
    setError((prev) => {
      return {
        ...prev,
        [value]: false,
      };
    });
  };

  const validatesInput = () => {
    if (number?.trim().length !== 11) {
      setError((prev) => {
        return {
          ...prev,
          num: true,
        };
      });
    }
    if (password.trim() === '' || password.trim().length < 8) {
      setError((prev) => {
        return {
          ...prev,
          pass: true,
        };
      });
    }
  };

  useEffect(() => {
    if (useFinger) {
      setNumber(loginDetails.number);
    }
  }, []);
  const handleLogin = async () => {
    validatesInput();

    if (
      number?.trim() === '' ||
      password.trim().length < 8 ||
      number?.trim().length !== 11
    ) {
      return;
    }

    try {
      setLoading(true);
      const response: responseProp = await sendPostRequest(number, password);
      setLoading(false);
      if (response?.status !== 'success') {
        toast.show({
          placement: 'top',
          render: ({ id }) => {
            const toastId = 'toast-' + id;
            return (
              <Toast
                nativeID={toastId}
                width={WindowConstant.width - 20}
                mt={40}
                action="error"
                variant="accent"
              >
                <VStack space="xs">
                  <ToastTitle>Login Fail</ToastTitle>
                  <ToastDescription>{response?.msg}</ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      }
    } catch (error) {}
  };

  return (
    <MyContainer
      style={{
        alignItems: 'center',
        paddingVertical: WindowConstant.width * 0.05,
      }}
    >
      <Heading mb={!useFinger ? '$5' : 0}>Welcome back!</Heading>
      {useFinger && <Heading mb="$3">{loginDetails.name}</Heading>}
      {!useFinger && (
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
      )}
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
          isDisabled={isLoading}
        >
          <ButtonText>{isLoading ? 'Loading...' : 'Login'}</ButtonText>
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
