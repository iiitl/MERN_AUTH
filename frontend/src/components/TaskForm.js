import { useState } from "react";
import { useTasksContext } from "../hooks/usetasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskForm = () => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const task = { title, description, progress };

    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setDescription("");
      setProgress("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Description :</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <label>Progress:</label>
      <input
        type="number"
        onChange={(e) => setProgress(e.target.value)}
        value={progress}
        className={emptyFields.includes("progress") ? "error" : ""}
      />

      <button>Add Task</button>
    </form>
  );
};

export default TaskForm;
