import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";
import React, {FC} from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {COLORS} from "../../../assets/styles/CustomColors";
import {Section, Task} from "../../types/todo-list/todo-list";
import {SwipeListView} from "react-native-swipe-list-view";
import {showAlert} from "../../../utils/alerts/showAlert";
import todoListReducer from "../../../redux/reducers/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {
  doDeleteDoingById,
  doDeleteDoneById,
  doDeleteTodoById,
} from "../../../redux/actions/todoListAction";

type Props = {
  groupedData: Array<Section>;
  fetchMoreData: (info: {distanceFromEnd: number}) => void;
};

const RenderSectionList: FC<Props> = ({groupedData, fetchMoreData}) => {
  const dispatch = useDispatch();

  const onDelete = (data: ListRenderItemInfo<Task>) => {
    console.log("data: ", data.item.status);

    if (data.item.status === "TODO") {
      dispatch(doDeleteTodoById(data.item.id));
    } else if (data.item.status === "DOING") {
      dispatch(doDeleteDoingById(data.item.id));
    } else if (data.item.status === "DONE") {
      dispatch(doDeleteDoneById(data.item.id));
    }
  };

  const renderItem = ({item}: {item: Task}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.labelHeader}>{item.title}</Text>
        <Text style={styles.labelDescription}>{item.description}</Text>
      </View>
    );
  };

  const renderHiddenItem = (data: ListRenderItemInfo<Task>) => (
    <View style={styles.contentHidden}>
      <TouchableOpacity onPress={() => onDelete(data)} style={styles.btnDelete}>
        <Text style={styles.labelDelete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = ({section: {title}}: any) => (
    <View style={styles.contentSection}>
      <Text style={[styles.labelGroup]}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        useNativeDriver
        useSectionList
        bounces={false}
        overScrollMode="never"
        disableRightSwipe
        sections={groupedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        renderSectionHeader={renderSectionHeader}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("4%"),
    paddingBottom: hp("4%"),
  },
  contentSection: {
    backgroundColor: "#fff",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
  },
  contentHidden: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelGroup: {
    fontWeight: "bold",
    fontSize: wp("5%"),
    color: COLORS.BLUE_VIOLET,
  },
  card: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginVertical: wp("2%"),
    marginHorizontal: wp("5%"),
    paddingVertical: wp("2%"),
    paddingHorizontal: wp("5%"),
    borderRadius: wp("2%"),

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnDelete: {
    alignItems: "center",
    top: 0,
    right: wp("5%"),
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "red",
    marginVertical: wp("2%"),
    paddingVertical: wp("2%"),
    paddingHorizontal: wp("5%"),
    borderRadius: wp("2%"),
  },
  labelHeader: {
    fontWeight: "600",
    fontSize: wp("4%"),
    color: COLORS.VIOLET,
  },
  labelDescription: {
    fontSize: wp("3%"),
    color: "#000",
  },
  labelDelete: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: "500",
  },
});

export default RenderSectionList;
