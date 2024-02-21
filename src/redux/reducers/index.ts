import {combineReducers} from "@reduxjs/toolkit";
import todoListReducer from "./todoListReducer";

export default combineReducers({
  todoListReducer: todoListReducer,
});

export interface RootState {
  todoListReducer: ReturnType<typeof todoListReducer>;
}
