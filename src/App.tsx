import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  //BLL:
  const todoListTitle: string = "What to learn today";
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS&TS", isDone: true },
    { id: v1(), title: "REACT", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  const removeTask = (taskID: string) => {
    setTasks(tasks.filter((t) => t.id !== taskID));
  };

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };

    const copyTasks = [...tasks];
    copyTasks.push(newTask);
    setTasks(copyTasks);
  };

  const changeStatus = (taskID: string, isDone: boolean) => {
    setTasks(tasks.map((t) => (t.id !== taskID ? t : { ...t, isDone })));
  };

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  const getTasksForTodoList = () => {
    switch (filter) {
      case "active":
        return tasks.filter((t) => !t.isDone);
      case "completed":
        return tasks.filter((t) => t.isDone);
      default:
        return tasks;
    }
  };
  //UI:

  return (
    <div className="App">
      <TodoList
        filter={filter}
        title={todoListTitle}
        tasks={getTasksForTodoList()}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
      />
    </div>
  );
}

export default App;
