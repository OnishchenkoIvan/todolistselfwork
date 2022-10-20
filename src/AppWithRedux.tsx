import React from "react";
import "./App.css";
import { TaskType } from "./TodoList";
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
import { addTodoListAC } from "./reducers/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import TodolistWithRedux from "./TodolistWithRedux";

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

  const dispatch = useDispatch();

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatch(action);
  };

  const todoListsComponents = todolists.map((tl) => {
    return (
      <Grid item key={tl.id}>
        <Paper elevation={8} style={{ padding: "20px" }}>
          <TodolistWithRedux
            todolistId={tl.id}
            filter={tl.filter}
            title={tl.title}
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
