import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { ColorConstant } from '../../utilities/Theme';

const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={ColorConstant.primary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
