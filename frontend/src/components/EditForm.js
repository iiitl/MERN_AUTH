import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTasksContext } from "../hooks/usetasksContext";

const EditForm = ({ task, setEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("");
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newtask = {
      title: title || "Please Enter a title",
      description: description || "Please Enter a description",
      progress: progress || 0,
    };

    const response = await fetch("/api/tasks/" + task._id, {
      method: "PATCH",
      body: JSON.stringify(newtask),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log(json);

    if (response.ok) {
      dispatch({ type: "CHANGE_TASK", payload: { _id: task._id, ...newtask } });
    }
    setEdit(false);
    setProgress('')
    setDescription('')
    setTitle('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="TaskName"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      ></input>
      <input
        required
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></input>
      <input
        type="number"
        placeholder="Progress"
        value={progress}
        required
        onChange={(e) => setProgress(e.target.value)}
      ></input>
      <button
        type="submit"
        className="button"
        onClick={handleSubmit}
        value={progress}
        disabled={!title || !description || !progress}
      >
        Change
      </button>
    </div>
  );
};

export { EditForm };