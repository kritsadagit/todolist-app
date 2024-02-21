import axios from "axios";
import join from "url-join";
import global from "./Global";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import {MMKV} from "react-native-mmkv";

var isAbsoluteURLRegex = /^(?:\w+:)\/\//;
const storage = new MMKV();

axios.interceptors.request.use(async config => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    const jwtToken = storage.getString("token");
    // const jwtToken = await AsyncStorage.getItem("token");
    if (jwtToken != null) {
      config.headers = {"x-access-token": jwtToken};
    }
    const authen = storage.getString("authentication");
    // const authen = await AsyncStorage.getItem("authentication");
    if (authen != null) {
      config.headers = {
        "x-access-token": jwtToken,
        Authorization: "Bearer " + authen,
        Accept: "application/json",
      };
    }
    config.url = join(global.WS_URL, config.url);
  }
  return config;
});

export const httpClient = axios;
