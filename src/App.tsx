import React, { useState } from "react";
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

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [todoListId: string]: Array<TaskType>;
};

function App() {
  //BLL:
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId_1, title: "What to learn today", filter: "all" },
    { id: todoListId_2, title: "What to buy", filter: "all" },
  ]);
  const [tasks, setTasks] = useState<TasksStateType>({
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
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId),
    });
  };

  const addTask = (title: string, todoListId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: [
        { id: v1(), title: title, isDone: false },
        ...tasks[todoListId],
      ],
    });
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === taskId ? { ...t, isDone: isDone } : t
      ),
    });
  };
  const changeTaskTitle = (
    taskId: string,
    title: string,
    todoListId: string
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === taskId ? { ...t, title: title } : t
      ),
    });
  };

  const changeTodoListFilter = (
    filter: FilterValuesType,
    todoListId: string
  ) => {
    setTodoLists(
      todoLists.map((tl) =>
        tl.id === todoListId ? { ...tl, filter: filter } : tl
      )
    );
  };
  const changeTodoListTitle = (title: string, todoListId: string) => {
    setTodoLists(
      todoLists.map((tl) => (tl.id === todoListId ? { ...tl, title } : tl))
    );
  };

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListId));
  };

  const addTodoList = (title: string) => {
    const newTodoListId: string = v1();
    setTodoLists([...todoLists, { id: newTodoListId, title, filter: "all" }]);
    setTasks({ ...tasks, [newTodoListId]: [] });
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

export default App;
