import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.welcome}>Welcome to My App!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});

export default App;
