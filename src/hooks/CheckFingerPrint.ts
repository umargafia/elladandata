import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

import { getEncryptedData } from '../utilities/SaveData';

type loginProps = {
  number?: string;
  name?: string;
  password?: string | null;
};

const useCheckFingerPrint = (): {
  useFinger: boolean;
  loginDetails: loginProps;
  setFinger: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const [useFinger, setFinger] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState<loginProps>({});

  const checkBio = async () => {
    // check if device has fingerprint
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      return;
    }

    // check if there is any fingerprint saved
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      return;
    }

    //get login details from local storage
    const data = await getEncryptedData();
    if (data) {
      setLoginDetails({
        number: data.phoneNumber,
        name: data.name,
        password: data.password,
      });
      setFinger(true);
    }
  };

  useEffect(() => {
    checkBio();
  }, []);

  return {
    useFinger,
    loginDetails,
    setFinger,
  };
};

export default useCheckFingerPrint;
