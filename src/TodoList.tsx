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

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  todoListId: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTask: (taskID: string, todoListId: string) => void;
  changeFilter: (filter: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (taskID: string, isDone: boolean, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void;
  changeTodoListTitle: (title: string, todoListId: string) => void;
};

const TodoList = (props: TodoListPropsType) => {
  let tasksItems: any = <span>Tasks list is empty</span>;
  if (props.tasks.length) {
    tasksItems = props.tasks.map((task) => {
      const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(task.id, title, props.todoListId);
      };
      return (
        <ListItem key={task.id} className={task.isDone ? "isDone" : ""}>
          <Checkbox
            style={{ color: "hotpink" }}
            onChange={(e) =>
              props.changeStatus(
                task.id,
                e.currentTarget.checked,
                props.todoListId
              )
            }
            checked={task.isDone}
          />
          <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
          <IconButton
            size="small"
            onClick={() => props.removeTask(task.id, props.todoListId)}
          >
            <DeleteForever />
          </IconButton>
        </ListItem>
      );
    });
  }

  const addTask = (title: string) => {
    props.addTask(title, props.todoListId);
  };
  const changeTodoListTitle = (title: string) => {
    props.changeTodoListTitle(title, props.todoListId);
  };
  const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
    return () => props.changeFilter(filter, todoListId);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
        <IconButton
          size="small"
          color={"primary"}
          onClick={() => props.removeTodoList(props.todoListId)}
        >
          <DeleteForever />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>{tasksItems}</ul>
      <div>
        <ButtonGroup variant={"contained"} size={"small"} disableElevation>
          <Button
            style={{ marginRight: "3px" }}
            color={props.filter === "all" ? "secondary" : "success"}
            onClick={() => props.changeFilter("all", props.todoListId)}
          >
            All
          </Button>
          <Button
            style={{ marginRight: "3px" }}
            color={props.filter === "active" ? "secondary" : "success"}
            onClick={handlerCreator("active", props.todoListId)}
          >
            Active
          </Button>
          <Button
            style={{ marginRight: "3px" }}
            color={props.filter === "completed" ? "secondary" : "success"}
            onClick={handlerCreator("completed", props.todoListId)}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TodoList;
