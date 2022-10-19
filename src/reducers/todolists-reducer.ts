import { FilterValuesType, TodoListType } from "../App";
import { v1 } from "uuid";

export type RemoveTodoListAT = {
  type: "REMOVE-TODOLIST";
  todoListId: string;
};

export type AddTodoListAT = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};

type ChangeTodoListFilterAT = {
  type: "CHANGE-TODOLIST-FILTER";
  filter: FilterValuesType;
  todoListId: string;
};

type ChangeTodoListTitleAT = {
  type: "CHANGE-TODOLIST-TITLE";
  title: string;
  todoListId: string;
};

type ActionType =
  | RemoveTodoListAT
  | AddTodoListAT
  | ChangeTodoListFilterAT
  | ChangeTodoListTitleAT;

let initialState: Array<TodoListType> = [];

export const todolistsReducer = (
  todolists: TodoListType[] = initialState,
  action: ActionType
): TodoListType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return todolists.filter((tl) => tl.id !== action.todoListId);

    case "ADD-TODOLIST":
      return [
        ...todolists,
        { id: action.todolistId, title: action.title, filter: "all" },
      ];

    case "CHANGE-TODOLIST-FILTER":
      return todolists.map((tl) =>
        tl.id === action.todoListId ? { ...tl, filter: action.filter } : tl
      );

    case "CHANGE-TODOLIST-TITLE":
      return todolists.map((tl) =>
        tl.id === action.todoListId ? { ...tl, title: action.title } : tl
      );
    default:
      return todolists;
  }
};

export const removeTodoListAC = (id: string): RemoveTodoListAT => ({
  type: "REMOVE-TODOLIST",
  todoListId: id,
});

export const addTodoListAC = (title: string): AddTodoListAT => ({
  type: "ADD-TODOLIST",
  title: title,
  todolistId: v1(),
});

export const changeTodoListFilterAC = (
  filter: FilterValuesType,
  todoListId: string
): ChangeTodoListFilterAT => ({
  type: "CHANGE-TODOLIST-FILTER",
  todoListId: todoListId,
  filter: filter,
});

export const changeTodoListTitleAC = (
  title: string,
  todoListId: string
): ChangeTodoListTitleAT => ({
  type: "CHANGE-TODOLIST-TITLE",
  todoListId,
  title,
});
