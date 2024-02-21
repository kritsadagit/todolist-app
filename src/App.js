import {Text, TextInput, LogBox} from "react-native";
import React from "react";
import AppNavigator from "./routes/AppNavigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {Tuple, configureStore} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import reducers from "./redux/reducers";
import logger from "redux-logger";

Text.defaultProps = {};
Text.defaultProps.maxFontSizeMultiplier = 1;
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = {};
TextInput.defaultProps.maxFontSizeMultiplier = 1;
TextInput.defaultProps.allowFontScaling = false;

LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered",
]);

const App = () => {
  return (
    <Provider
      store={configureStore({
        reducer: reducers,
        // middleware: () => new Tuple(thunk, logger),
        middleware: () => new Tuple(thunk),
      })}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
