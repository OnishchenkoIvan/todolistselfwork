import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(false);
    setTitle(e.currentTarget.value);
  };

  const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addItem();
  };

  const addItem = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      props.addItem(trimmedTitle);
    } else {
      setError(true);
    }

    setTitle("");
  };

  return (
    <div>
      <TextField
        variant={"outlined"}
        size={"small"}
        label={"Title"}
        helperText={error && "Title is required!"}
        value={title}
        onChange={changeTitle}
        onKeyDown={onKeyDownAddTask}
        error={error}
      />
      <IconButton onClick={addItem}>
        <AddCircleOutline />
      </IconButton>
    </div>
  );
};
