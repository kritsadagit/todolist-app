import {Action} from "@reduxjs/toolkit";
import {
  DELETE_DOING_DATA,
  DELETE_DONE_DATA,
  DELETE_TODO_DATA,
  DOING_DATA,
  DONE_DATA,
  TODO_DATA,
} from "../constants";
import {
  Section,
  StatusTodoList,
  Task,
} from "../../screens/types/todo-list/todo-list";
import {ListRenderItemInfo} from "react-native";

interface TodoListAction extends Action {
  type: typeof TODO_DATA;
  payload: Array<Section>;
}

interface DoingAction extends Action {
  type: typeof DOING_DATA;
  payload: Array<Section>;
}

interface DoneAction extends Action {
  type: typeof DONE_DATA;
  payload: Array<Section>;
}

interface DeleteTodoById extends Action {
  type: typeof DELETE_TODO_DATA;
  payload: string;
}

interface DeleteDoingById extends Action {
  type: typeof DELETE_DOING_DATA;
  payload: string;
}

interface DeleteDoneById extends Action {
  type: typeof DELETE_DONE_DATA;
  payload: string;
}

type Actions =
  | TodoListAction
  | DoingAction
  | DoneAction
  | DeleteTodoById
  | DeleteDoingById
  | DeleteDoneById;

const initialState = {
  todo_data: [],
  doing_data: [],
  done_data: [],
};

const deleteItemById = (store: Section[], payload: string) => {
  return store
    .map((sectionData: Section) => ({
      ...sectionData,
      data: sectionData.data.filter(task => task.id !== payload),
    }))
    .filter(item => item.data.length !== 0);
};

export default (state = initialState, action: Actions) => {
  switch (action.type) {
    case TODO_DATA:
      return {...state, todo_data: action.payload};
    case DOING_DATA:
      return {...state, doing_data: action.payload};
    case DONE_DATA:
      return {...state, done_data: action.payload};
    case DELETE_TODO_DATA:
      return {
        ...state,
        todo_data: deleteItemById(state.todo_data, action.payload),
      };
    case DELETE_DOING_DATA:
      return {
        ...state,
        doing_data: deleteItemById(state.doing_data, action.payload),
      };
    case DELETE_DONE_DATA:
      return {
        ...state,
        done_data: deleteItemById(state.done_data, action.payload),
      };
    default:
      return state;
  }
};
