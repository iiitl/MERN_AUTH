import { useAuthContext } from "./useAuthContext";
import { useTasksContext } from "./usetasksContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchTasks } = useTasksContext();

  const logout = () => {
    // remove user from local storage

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchTasks({ type: "SET_TASKS", payload: null });
  };

  return { logout };
};
