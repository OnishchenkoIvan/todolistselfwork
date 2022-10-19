import React, { useReducer } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todolistsReducer,
} from "./reducers/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./reducers/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [todoListId: string]: Array<TaskType>;
};

function AppWithReducers() {
  //BLL:
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todoLists, dispatchToTodolist] = useReducer(todolistsReducer, [
    { id: todoListId_1, title: "What to learn today", filter: "all" },
    { id: todoListId_2, title: "What to buy", filter: "all" },
  ]);
  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todoListId_1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS&TS", isDone: true },
      { id: v1(), title: "REACT", isDone: false },
    ],
    [todoListId_2]: [
      { id: v1(), title: "BEER", isDone: true },
      { id: v1(), title: "MEAT", isDone: true },
      { id: v1(), title: "FISH", isDone: false },
    ],
  });

  const removeTask = (taskId: string, todoListId: string) => {
    const action = removeTaskAC(taskId, todoListId);
    dispatchToTasks(action);
  };

  const addTask = (title: string, todoListId: string) => {
    dispatchToTasks(addTaskAC(title, todoListId));
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId));
  };

  const changeTaskTitle = (
    taskId: string,
    title: string,
    todoListId: string
  ) => {
    dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId));
  };

  const changeTodoListFilter = (
    filter: FilterValuesType,
    todoListId: string
  ) => {
    dispatchToTodolist(changeTodoListFilterAC(filter, todoListId));
  };

  const changeTodoListTitle = (title: string, todoListId: string) => {
    const action = changeTodoListTitleAC(title, todoListId);
    dispatchToTodolist(action);
  };

  const removeTodoList = (todoListId: string) => {
    const action = removeTodoListAC(todoListId);
    dispatchToTodolist(action);
    dispatchToTasks(action);
  };

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatchToTasks(action);
    dispatchToTodolist(action);
  };

  //UI:
  const getTasksForTodoList = (
    filter: FilterValuesType,
    tasks: Array<TaskType>
  ) => {
    switch (filter) {
      case "active":
        return tasks.filter((t) => !t.isDone);
      case "completed":
        return tasks.filter((t) => t.isDone);
      default:
        return tasks;
    }
  };

  const todoListsComponents = todoLists.map((tl) => {
    const tasksForTodoList = getTasksForTodoList(tl.filter, tasks[tl.id]);
    return (
      <Grid item key={tl.id}>
        <Paper elevation={8} style={{ padding: "20px" }}>
          <TodoList
            todoListId={tl.id}
            filter={tl.filter}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeTodoListFilter}
            addTask={addTask}
            changeStatus={changeTaskStatus}
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">Todolists</Typography>
          <Button color="inherit" variant={"outlined"}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px 0" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={5} justifyContent={"space-evenly"}>
          {todoListsComponents}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
