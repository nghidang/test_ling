import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';

import store from './src/store';
import Main from './src/main';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Main />
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
