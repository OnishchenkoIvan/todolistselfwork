import React from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
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
} from "./reducers/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./reducers/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [todoListId: string]: Array<TaskType>;
};

function AppWithRedux() {
  let todolists = useSelector<AppRootStateType, Array<TodoListType>>(
    (state) => state.todolists
  );
  let tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const dispatch = useDispatch();

  const removeTask = (taskId: string, todoListId: string) => {
    const action = removeTaskAC(taskId, todoListId);
    dispatch(action);
  };

  const addTask = (title: string, todoListId: string) => {
    dispatch(addTaskAC(title, todoListId));
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
  };

  const changeTaskTitle = (
    taskId: string,
    title: string,
    todoListId: string
  ) => {
    dispatch(changeTaskTitleAC(taskId, title, todoListId));
  };

  const changeTodoListFilter = (
    filter: FilterValuesType,
    todoListId: string
  ) => {
    dispatch(changeTodoListFilterAC(filter, todoListId));
  };

  const changeTodoListTitle = (title: string, todoListId: string) => {
    const action = changeTodoListTitleAC(title, todoListId);
    dispatch(action);
  };

  const removeTodoList = (todoListId: string) => {
    const action = removeTodoListAC(todoListId);
    dispatch(action);
  };

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatch(action);
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

  const todoListsComponents = todolists.map((tl) => {
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

export default AppWithRedux;
