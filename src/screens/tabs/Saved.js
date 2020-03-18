import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Saved = () => (
  <View style={styles.container}>
    <Text>Saved</Text>
  </View>
);

export default Saved;
