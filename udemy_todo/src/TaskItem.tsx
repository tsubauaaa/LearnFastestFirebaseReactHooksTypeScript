import React, { useState } from "react";
import styles from "./TaskItem.module.css";
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutLinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutLilinedIcon from "@material-ui/icons/EditOutlined";
import { db } from "./firebase";

interface PROPS {
  id: string;
  title: string;
}
const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection("tasks").doc(props.id).set(
      {
        title: title,
      },
      { merge: true }
    );
  };

  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };

  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justify="flex-end">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Edit task"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </Grid>
      <button className={styles.taskitem__icon} onClick={editTask}>
        <EditOutLilinedIcon />
      </button>
      <button className={styles.taskitem__icon} onClick={deleteTask}>
        <DeleteOutLinedIcon />
      </button>
    </ListItem>
  );
};

export default TaskItem;
