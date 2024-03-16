import { useTasksContext } from "../hooks/usetasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Modal } from "./Modal";
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

  return (
    <div className="task-details">
      <h3>{task.title}</h3>

      <p>
        <strong>Description : </strong>
        {task.description}
      </p>
      <p>
        <strong>Progress: </strong>
        {task.progress}
      </p>

      <Modal handleClick={handleClick} />
    </div>
  );
};

export default TaskDetails;
