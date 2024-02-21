import {View, StyleSheet} from "react-native";
import React, {FC} from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SwitchSelector from "react-native-switch-selector";
import {COLORS} from "../../../assets/styles/CustomColors";
import {StatusTodoList} from "../../types/todo-list/todo-list";

type Props = {
  onHandlePressTab: (value: StatusTodoList) => void;
};

const RenderSwitchTab: FC<Props> = ({onHandlePressTab}) => {
  return (
    <View style={styles.container}>
      <SwitchSelector
        initial={0}
        onPress={onHandlePressTab}
        textColor={COLORS.BLUE_VIOLET}
        selectedColor={"#fff"}
        buttonColor={COLORS.VIOLET}
        borderColor={COLORS.VIOLET}
        borderWidth={1}
        fontSize={wp("4%")}
        height={wp("12%")}
        hasPadding
        options={[
          {label: "To-do", value: "TODO"},
          {label: "Doing", value: "DOING"},
          {label: "Done", value: "DONE"},
        ]}
        testID="todo-switch-selector"
        accessibilityLabel="todo-switch-selector"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    top: hp("28%"),
    position: "absolute",
    paddingHorizontal: wp("5%"),
    right: 0,
    left: 0,
  },
});

export default RenderSwitchTab;
