import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { DeviceConstant, WindowConstant } from '../../utilities/Theme';

const MyContainer: React.FC<{
  style?: {};
  padding?: number;
  background?: string;
  children?: React.ReactNode;
}> = ({ style, padding, background, children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View
        style={[
          styles.container,
          padding && { paddingTop: WindowConstant.width * 0.05 },
          style,
          background && { backgroundColor: background },
        ]}
      >
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

export default MyContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: DeviceConstant.isAndroid ? StatusBar.currentHeight : 30,
    paddingHorizontal: WindowConstant.width * 0.05,
    paddingBottom: WindowConstant.width * 0.05,
  },
});
