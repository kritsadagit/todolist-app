import React, {FC} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PasscodeLockScreen from "../../screens/PasscodeLockScreen/PasscodeLockScreen";
import MainScreen from "../../screens/MainScreen/MainScreen";
import {TypeStackParamList} from "./typeStackParamList";
import LinearGradient from "react-native-linear-gradient";
import {StatusBar} from "react-native";
import {COLORS} from "../../assets/styles/CustomColors";
import RegisterScreen from "../../screens/RegisterScreen/RegisterScreen";

const Stack = createNativeStackNavigator<TypeStackParamList>();

const StackScreen: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="PasscodeLock"
      screenOptions={{
        animation: "slide_from_right",
        gestureEnabled: false,
        headerTintColor: "#fff",
        headerBackground: () => (
          <LinearGradient
            colors={[COLORS.BLUE_VIOLET, COLORS.VIOLET]}
            style={{flex: 1}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <StatusBar
              translucent={true}
              backgroundColor={"transparent"}
              barStyle={"light-content"}
            />
          </LinearGradient>
        ),
      }}>
      <Stack.Screen
        name="PasscodeLock"
        component={PasscodeLockScreen}
        options={{
          headerShown: false,
          headerBackground: undefined,
        }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          // headerShown: false,
          // headerBackground: undefined,
          headerBackTitleVisible: false,
          title:"Set Your PIN Code"
        }}
      />

      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          // title: "To-do List",
          headerShown: false,
          headerBackground: undefined,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackScreen;
