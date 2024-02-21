import {RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type TypeStackParamList = {
  PasscodeLock: undefined;
  Register: undefined;
  Main: undefined;
};

export type PasscodeLockRouteProp = RouteProp<
  TypeStackParamList,
  "PasscodeLock"
>;
export type PasscodeLockNavigationProp = NativeStackNavigationProp<
  TypeStackParamList,
  "PasscodeLock"
>;

export type MainRouteProp = RouteProp<TypeStackParamList, "Main">;
export type MainNavigationProp = NativeStackNavigationProp<
  TypeStackParamList,
  "Main"
>;

export type RegisterRouteProp = RouteProp<TypeStackParamList, "Register">;
export type RegisterNavigationProp = NativeStackNavigationProp<
  TypeStackParamList,
  "Register"
>;
