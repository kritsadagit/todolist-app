import {View, StyleSheet, InteractionManager} from "react-native";
import React, {FC, useCallback, useEffect, useState} from "react";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import {showAlert} from "../../utils/alerts/showAlert";
import {httpClient} from "../../services/HttpClient";
import {
  ResponseTodoList,
  Section,
  StatusTodoList,
  Task,
} from "../types/todo-list/todo-list";
import {determineGroup} from "../../utils/datesConvert/seperateGroup";
import RenderHeader from "./Header/RenderHeader";
import RenderSwitchTab from "./SwitchTabs/RenderSwitchTab";
import RenderSectionList from "./SectionList/RenderSectionList";
import {useDispatch, useSelector} from "react-redux";
import {
  doSetDoingData,
  doSetDoneData,
  doSetTodoData,
} from "../../redux/actions/todoListAction";
import {RootState} from "../../redux/reducers";
import {mergeData} from "../../utils/datesConvert/mergeData";
import {useNavigation} from "@react-navigation/native";
import {PasscodeLockNavigationProp} from "../../routes/stacks/typeStackParamList";

type NavigationProps = PasscodeLockNavigationProp;

const MainScreen: FC = () => {
  const LIMIT = 10;
  // const appState = useRef(AppState.currentState);

  const navigation = useNavigation<NavigationProps>();

  const dispatch = useDispatch();
  const todoListReducer = useSelector(
    (state: RootState) => state.todoListReducer,
  );

  // const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [loading, setLoading] = useState<boolean>(false);
  const [switchValue, setSwitchValue] = useState<StatusTodoList>("TODO");

  const [offsetTodo, setOffsetTodo] = useState<number>(0);
  const [totalPagesTodo, setTotalPageTodo] = useState<number>(0);

  const [offsetDoing, setOffsetDoing] = useState<number>(0);
  const [totalPagesDoing, setTotalPageDoing] = useState<number>(0);

  const [offsetDone, setOffsetDone] = useState<number>(0);
  const [totalPagesDone, setTotalPageDone] = useState<number>(0);

  const resetTimer = useCallback(() => {
    clearTimeout(interactionTimer);
    startTimer();
  }, []);

  let interactionTimer: NodeJS.Timeout;

  const startTimer = () => {
    interactionTimer = setTimeout(() => {
      navigation.replace("PasscodeLock");
    }, 10000);
  };

  useEffect(() => {
    const interactionSubscription = InteractionManager.runAfterInteractions(
      () => {
        startTimer();
      },
    );

    return () => {
      clearTimeout(interactionTimer);
      interactionSubscription.cancel();
    };
  }, [navigation]);

  useEffect(() => {
    if (offsetTodo !== 0 && offsetTodo < totalPagesTodo) {
      fetchTodoListAPI(offsetTodo);
    }
  }, [offsetTodo]);

  useEffect(() => {
    if (offsetDoing !== 0 && offsetDoing < totalPagesDoing) {
      fetchTodoListAPI(offsetDoing);
    }
  }, [offsetDoing]);

  useEffect(() => {
    if (offsetDone !== 0 && offsetDone < totalPagesDone) {
      fetchTodoListAPI(offsetDone);
    }
  }, [offsetDone]);

  useEffect(() => {
    switchValue === "TODO" && fetchTodoListAPI(offsetTodo);
    switchValue === "DOING" && fetchTodoListAPI(offsetDoing);
    switchValue === "DONE" && fetchTodoListAPI(offsetDone);
  }, [switchValue]);

  const fetchTodoListAPI = async (offset: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await httpClient.get<ResponseTodoList>(
        `/todo-list?offset=${offset}&limit=${LIMIT}&sortBy=createAt&isAsc=true&status=${switchValue}`,
      );

      const {totalPages, tasks} = response.data;
      switchValue === "TODO" && setTotalPageTodo(totalPages);
      switchValue === "DOING" && setTotalPageDoing(totalPages);
      switchValue === "DONE" && setTotalPageDone(totalPages);

      setLoading(false);
      if (tasks) {
        const updatedTasks = tasks.map(task => ({
          ...task,
          group: determineGroup(task.createdAt),
        }));

        const groupTasks: Section[] = updatedTasks.reduce(
          (acc: {title: string; data: Task[]}[], updateTask) => {
            const existingGroup = acc.find(
              group => group.title === updateTask.group,
            );
            if (existingGroup) {
              existingGroup.data.push(updateTask);
            } else {
              acc.push({title: updateTask.group, data: [updateTask]});
            }
            return acc;
          },
          [],
        );

        if (switchValue === "TODO") {
          if (offsetTodo !== 0) {
            const concat = mergeData(todoListReducer.todo_data, groupTasks);
            dispatch(doSetTodoData(concat));
          } else {
            dispatch(doSetTodoData(groupTasks));
          }
        } else if (switchValue === "DOING") {
          if (offsetTodo !== 0) {
            const concat = mergeData(todoListReducer.doing_data, groupTasks);
            dispatch(doSetDoingData(concat));
          } else {
            dispatch(doSetDoingData(groupTasks));
          }
        } else if (switchValue === "DONE") {
          if (offsetTodo !== 0) {
            const concat = mergeData(todoListReducer.done_data, groupTasks);
            dispatch(doSetDoneData(concat));
          } else {
            dispatch(doSetDoneData(groupTasks));
          }
        }
      }
    } catch (error: any) {
      setLoading(false);
      showAlert(error.message);
    }
  };

  const onHandlePressTab = (value: StatusTodoList): void => {
    reset();
    setSwitchValue(value);
  };

  const fetchMoreData = (): void => {
    switchValue === "TODO" &&
      offsetTodo + 1 !== totalPagesTodo &&
      setOffsetTodo(prevOffset => prevOffset + 1);
    switchValue === "DOING" &&
      offsetDoing + 1 !== totalPagesDoing &&
      setOffsetDoing(prevOffset => prevOffset + 1);
    switchValue === "DONE" &&
      offsetDone + 1 !== totalPagesDone &&
      setOffsetDone(prevOffset => prevOffset + 1);
  };

  const reset = () => {
    dispatch(doSetTodoData([]));
    dispatch(doSetDoingData([]));
    dispatch(doSetDoneData([]));

    setOffsetTodo(0);
    setOffsetDoing(0);
    setOffsetDone(0);

    setTotalPageTodo(0);
    setTotalPageDoing(0);
    setTotalPageDone(0);
  };

  return (
    <View style={styles.container} onTouchStart={resetTimer}>
      <CustomSpinner loading={loading} />
      <RenderHeader />
      <RenderSwitchTab onHandlePressTab={onHandlePressTab} />
      {switchValue === "TODO" && (
        <RenderSectionList
          groupedData={todoListReducer.todo_data}
          fetchMoreData={fetchMoreData}
        />
      )}

      {switchValue === "DOING" && (
        <RenderSectionList
          groupedData={todoListReducer.doing_data}
          fetchMoreData={fetchMoreData}
        />
      )}

      {switchValue === "DONE" && (
        <RenderSectionList
          groupedData={todoListReducer.done_data}
          fetchMoreData={fetchMoreData}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MainScreen;
