import {View, Text, Image, StyleSheet} from "react-native";
import React, {FC} from "react";
import LinearGradient from "react-native-linear-gradient";
import {COLORS} from "../../../assets/styles/CustomColors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomStatusBar from "../../../components/statusbar/CustomStatusBar";

const RenderHeader: FC = () => {
  return (
    <LinearGradient
      colors={[COLORS.BLUE_VIOLET, COLORS.VIOLET]}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <CustomStatusBar />
      <View style={styles.content}>
        <View style={{alignItems: "center"}}>
          <Image
            source={require("../../../assets/images/icon-main-screen/logo-robinhood.png")}
            style={styles.imgProfile}
          />
          <View style={{marginTop: hp("1%")}}>
            <Text style={styles.labelUser}>Hi! Mr. Robinhood</Text>
          </View>
        </View>
        <View style={{marginTop: hp(".5%")}}>
          <Text style={styles.labelDescription}>
            Efficient task management made simple. Stay organized, focused, and
            on track with our intuitive to-do list app.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp("15%"),
    borderBottomLeftRadius: wp("50%"),
    borderBottomRightRadius: wp("0%"),
  },
  content: {
    width: wp("100%"),
    position: "absolute",
    top: hp("5%"),
  },
  imgProfile: {
    width: wp("25%"),
    height: wp("25%"),
  },
  labelUser: {
    color: "#fff",
    fontSize: wp("7%"),
    fontWeight: "500",
  },
  labelDescription: {
    color: "#fff",
    fontSize: wp("3%"),
    paddingLeft: wp("30%"),
    paddingRight: wp("2%"),
  },
});

export default RenderHeader;
