import {View, Text, StatusBar} from "react-native";
import React from "react";

const CustomStatusBar = () => {
  return (
    <StatusBar
      translucent={true}
      backgroundColor={"transparent"}
      barStyle={"light-content"}
    />
  );
};

export default CustomStatusBar;
