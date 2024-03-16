import { useTasksContext } from "../hooks/usetasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import dateFormat from "dateformat";
import { Modal } from "./Modal";
import { useState } from "react";
import { EditForm } from "./EditForm";

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [edit, setEdit] = useState(false);


  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/tasks/" + task._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };

  return (
    <div className="task-details">
      <span
        className="material-symbols-outlined"
        onClick={() => setEdit(!edit)}
      >
        edit
      </span>
      <Modal handleClick={handleClick} />
      <h3>{task.title}</h3>
      <p>
        <strong>Description : </strong>
        {task.description}
      </p>
      <p>
        <strong>Progress: </strong>
        {task.progress}
      </p>
      <p>{dateFormat(task.createdAt, "longDate")}</p>
      {edit && <EditForm task={task} setEdit={setEdit}/>}
    </div>
  );
};

export default TaskDetails;
