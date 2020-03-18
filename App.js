import React from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import FlashMessage from "react-native-flash-message";
const Main = () => (
  <Provider theme={theme}>
    <App />
    <FlashMessage position="top" animated={true} />

  </Provider>
);

export default Main;
