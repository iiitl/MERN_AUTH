import { useTasksContext } from "../hooks/usetasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { formatDistanceToNow, parseISO } from "date-fns";
const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

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

  // console.log(task);
  return (
    <div className="task-details">
      <div className="text">
        <h3 className="title">{task.title}</h3>
        <p>{task.description}</p>
        <p></p>
        <p>{formatDistanceToNow(parseISO(task.createdAt))} ago</p>
      </div>
      <div className="progress">
        <CircularProgressbar value={task.progress} text={`${task.progress}%`} />
      </div>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default TaskDetails;
