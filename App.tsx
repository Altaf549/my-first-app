import React from 'react';
import { StatusBar } from 'react-native';
import CountryList from './screens/CountryList';

function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <CountryList />
    </>
  );
}

export default App;
