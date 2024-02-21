interface ResponseTodoList {
  pageNumber: number;
  totalPages: number;
  tasks: Array<Task>;
}

interface Task {
  id: string;
  title: string;
  group: string;
  description: string;
  createdAt: string;
  status: StatusTodoList;
}

interface Section {
  title: string;
  data: Array<Task>;
}

type StatusTodoList = "TODO" | "DOING" | "DONE";

export type {ResponseTodoList, Task, StatusTodoList, Section};
