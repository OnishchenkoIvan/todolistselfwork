import { TasksStateType } from "../App";
import { v1 } from "uuid";
import { AddTodoListAT, RemoveTodoListAT } from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListAT
  | RemoveTodoListAT;

let initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (t) => t.id !== action.payload.taskId
        ),
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.payload.todolistId]: [
          { id: v1(), title: action.payload.title, isDone: false },
          ...state[action.payload.todolistId],
        ],
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, isDone: action.payload.isDone }
            : t
        ),
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, title: action.payload.title }
            : t
        ),
      };

    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolistId]: [],
      };
    case "REMOVE-TODOLIST":
      const {
        [action.todoListId]: [],
        ...rest
      } = { ...state };
      return rest;

    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: "REMOVE-TASK", payload: { taskId, todolistId } } as const;
};

export const addTaskAC = (title: string, todolistId: string) => {
  return { type: "ADD-TASK", payload: { title, todolistId } } as const;
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: { taskId, isDone, todolistId },
  } as const;
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: { taskId, title, todolistId },
  } as const;
};
