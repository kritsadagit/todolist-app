import {View, Text, StyleSheet, Image} from "react-native";
import React, {FC, useState} from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PINCode from "@haskkor/react-native-pincode";
import {PinResultStatus} from "@haskkor/react-native-pincode/dist/src/utils";
import {PasscodeLockNavigationProp} from "../../routes/stacks/typeStackParamList";
import {useNavigation} from "@react-navigation/native";
import {MMKV} from "react-native-mmkv";
import {COLORS} from "../../assets/styles/CustomColors";

type NavigationProps = PasscodeLockNavigationProp;

const RegisterScreen: FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const storage = new MMKV();

  const [pinStatus, setPinStatus] = useState<PinResultStatus>(
    PinResultStatus.initial,
  );

  const handleFinishProcess = (pin?: string) => {
    if (pin) {
      storage.set("pincode", pin);
      setPinStatus(PinResultStatus.success);
      navigation.replace("PasscodeLock");
    }
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
      <PINCode
        status="choose"
        pinStatus={pinStatus}
        touchIDDisabled={true}
        disableLockScreen={true}
        stylePinCodeTextTitle={styles.pincode_title}
        stylePinCodeTextSubtitle={styles.pincode_subtitle}
        stylePinCodeColorTitle={COLORS.VIOLET}
        stylePinCodeColorSubtitle={COLORS.BLUE_VIOLET}
        colorPassword={COLORS.VIOLET}
        stylePinCodeHiddenPasswordSizeEmpty={wp("3.5%")}
        stylePinCodeHiddenPasswordSizeFull={wp("4.2%")}
        numbersButtonOverlayColor={COLORS.GLOSSY_GRAPE}
        stylePinCodeButtonNumber={COLORS.BLUE_VIOLET}
        stylePinCodeButtonNumberPressed={"#fff"}
        colorCircleButtons={COLORS.BRIGHT_GRAY}
        passwordLength={6}
        finishProcess={handleFinishProcess}
        delayBetweenAttempts={1500}
        vibrationEnabled={false}
        customBackSpaceIcon={renderBottomRightPin}
        stylePinCodeColumnDeleteButton={styles.pincodeColumnDeleteBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  pincode_title: {
    fontSize: wp("7%"),
    fontWeight: "500",
  },
  pincode_subtitle: {
    fontSize: wp("5%"),
    fontWeight: "normal",
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

export default RegisterScreen;
