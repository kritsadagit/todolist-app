import {Section} from "../../screens/types/todo-list/todo-list";
import {
  DELETE_DOING_DATA,
  DELETE_DONE_DATA,
  DELETE_TODO_DATA,
  DOING_DATA,
  DONE_DATA,
  TODO_DATA,
} from "../constants";

export const doSetTodoData = (payload: Array<Section>) => ({
  type: TODO_DATA,
  payload,
});

export const doSetDoingData = (payload: Array<Section>) => ({
  type: DOING_DATA,
  payload,
});

export const doSetDoneData = (payload: Array<Section>) => ({
  type: DONE_DATA,
  payload,
});

export const doDeleteTodoById = (payload: string) => ({
  type: DELETE_TODO_DATA,
  payload,
});

export const doDeleteDoingById = (payload: string) => ({
  type: DELETE_DOING_DATA,
  payload,
});

export const doDeleteDoneById = (payload: string) => ({
  type: DELETE_DONE_DATA,
  payload,
});
