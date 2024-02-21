import {View, StyleSheet, Text, TouchableOpacity, Image} from "react-native";
import React, {FC, useState} from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {useNavigation} from "@react-navigation/native";
import {
  MainNavigationProp,
  RegisterNavigationProp,
} from "../../routes/stacks/typeStackParamList";
import PINCode from "@haskkor/react-native-pincode";
import {PinResultStatus} from "@haskkor/react-native-pincode/dist/src/utils";
import {MMKV} from "react-native-mmkv";
import LinearGradient from "react-native-linear-gradient";
import {COLORS} from "../../assets/styles/CustomColors";

type NavigationProps = MainNavigationProp | RegisterNavigationProp;

const PasscodeLockScreen: FC = () => {
  const storage = new MMKV();
  let pincode = storage.getString("pincode");

  if (!pincode) {
    storage.set("pincode", "123456");
    pincode = storage.getString("pincode");
  }

  const [pinStatus, setPinStatus] = useState<PinResultStatus>(
    PinResultStatus.initial,
  );

  const navigation = useNavigation<NavigationProps>();

  const handlePincodeEnter = async (pin: string) => {
    if (pin === pincode) {
      setPinStatus(PinResultStatus.success);
      navigation.replace("Main");
    } else setPinStatus(PinResultStatus.failure);
  };

  const onRegister = () => {
    navigation.navigate("Register");
  };

  const renderBottomRightPin = () => (
    <Image
      source={require("../../assets/images/icon-passcode-lock-screen/icon-delete.png")}
      style={styles.icon_delete}
      resizeMode="contain"
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentPin}>
        <PINCode
          status="enter"
          pinStatus={pinStatus}
          storedPin={pincode}
          touchIDDisabled={true}
          disableLockScreen={true}
          titleEnter="Welcome to Todo List App"
          subtitleEnter="Enter your PIN Code"
          stylePinCodeColorTitle={COLORS.VIOLET}
          stylePinCodeColorSubtitle={COLORS.BLUE_VIOLET}
          stylePinCodeTextTitle={styles.pincodeTitle}
          stylePinCodeTextSubtitle={styles.pincodeSubtitle}
          colorPassword={COLORS.VIOLET}
          stylePinCodeHiddenPasswordSizeEmpty={wp("3.5%")}
          stylePinCodeHiddenPasswordSizeFull={wp("4.2%")}
          numbersButtonOverlayColor={COLORS.GLOSSY_GRAPE}
          stylePinCodeButtonNumber={COLORS.BLUE_VIOLET}
          stylePinCodeButtonNumberPressed={"#fff"}
          stylePinCodeTextButtonCircle={{fontWeight: "400"}}
          colorCircleButtons={COLORS.BRIGHT_GRAY}
          passwordLength={6}
          handleResultEnterPin={handlePincodeEnter}
          delayBetweenAttempts={1500}
          vibrationEnabled={false}
          customBackSpaceIcon={renderBottomRightPin}
          stylePinCodeColumnDeleteButton={styles.pincodeColumnDeleteBtn}
        />
      </View>

      <View style={styles.contentRegister}>
        <TouchableOpacity onPress={onRegister}>
          <LinearGradient
            colors={[COLORS.BLUE_VIOLET, COLORS.VIOLET]}
            style={styles.btnRegister}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.labelRegister}>Set PIN Code</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentPin: {
    flex: 0.8,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  contentRegister: {
    flex: 0.2,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pincodeTitle: {
    fontSize: wp("7%"),
    fontWeight: "500",
  },
  pincodeSubtitle: {
    fontSize: wp("5%"),
    fontWeight: "normal",
  },
  labelRegister: {
    fontSize: wp("5%"),
    fontWeight: "500",
    color: "#fff",
  },
  btnRegister: {
    paddingVertical: wp("3%"),
    width: wp("80%"),
    alignItems: "center",
    borderRadius: wp("100%"),
  },
  pincodeColumnDeleteBtn: {
    flex: 1,
    justifyContent: "center",
    marginTop: wp("0%"),
  },
  icon_delete: {
    width: wp("8%"),
    height: wp("8%"),
  },
});

export default PasscodeLockScreen;
