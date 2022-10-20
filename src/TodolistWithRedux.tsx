import React from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {
  Button,
  ButtonGroup,
  Checkbox,
  IconButton,
  ListItem,
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./reducers/tasks-reducer";
import {
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "./reducers/todolists-reducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  todolistId: string;
  title: string;
  filter: FilterValuesType;
};

const TodolistWithRedux = ({
  todolistId,
  title,
  filter,
}: TodoListPropsType) => {
  let tasksItems: any = <span>Tasks list is empty</span>;

  let tasksForTodolist = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[todolistId]
  );
  const dispatch = useDispatch();

  const changeTaskTitle = (taskId: string, title: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todolistId));
  };

  const addTask = (title: string) => {
    dispatch(addTaskAC(title, todolistId));
  };
  const changeTodoListTitle = (title: string) => {
    dispatch(changeTodoListTitleAC(title, todolistId));
  };
  const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
    return () => dispatch(changeTodoListFilterAC(filter, todoListId));
  };

  const removeTodolist = () => {
    dispatch(removeTodoListAC(todolistId));
  };

  if (filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
  }

  if (tasksForTodolist.length) {
    tasksItems = tasksForTodolist.map((task) => {
      return (
        <ListItem key={task.id} className={task.isDone ? "isDone" : ""}>
          <Checkbox
            style={{ color: "hotpink" }}
            onChange={(e) =>
              dispatch(
                changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId)
              )
            }
            checked={task.isDone}
          />
          <EditableSpan
            title={task.title}
            changeTitle={(newTitle: string) =>
              changeTaskTitle(task.id, newTitle)
            }
          />
          <IconButton
            size="small"
            onClick={() => dispatch(removeTaskAC(task.id, todolistId))}
          >
            <DeleteForever />
          </IconButton>
        </ListItem>
      );
    });
  }

  return (
    <div>
      <h3>
        <EditableSpan title={title} changeTitle={changeTodoListTitle} />
        <IconButton size="small" color={"primary"} onClick={removeTodolist}>
          <DeleteForever />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>{tasksItems}</ul>
      <div>
        <ButtonGroup variant={"contained"} size={"small"} disableElevation>
          <Button
            style={{ marginRight: "3px" }}
            color={filter === "all" ? "secondary" : "success"}
            onClick={handlerCreator("all", todolistId)}
          >
            All
          </Button>
          <Button
            style={{ marginRight: "3px" }}
            color={filter === "active" ? "secondary" : "success"}
            onClick={handlerCreator("active", todolistId)}
          >
            Active
          </Button>
          <Button
            style={{ marginRight: "3px" }}
            color={filter === "completed" ? "secondary" : "success"}
            onClick={handlerCreator("completed", todolistId)}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TodolistWithRedux;
