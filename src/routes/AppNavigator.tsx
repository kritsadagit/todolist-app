import React, {FC} from "react";
import {NavigationContainer} from "@react-navigation/native";
import StackScreen from "./stacks/StackScreen";

const AppNavigator: FC = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default AppNavigator;
