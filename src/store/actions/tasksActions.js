import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from "../types"
const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const tasksRequest = () => ({
   type: TASKS_REQUEST,
})

export const tasksSuccess = data => ({
   type: TASKS_SUCCESS,
   payload: data,
})

export const tasksFailure = error => ({
   type: TASKS_FAILURE,
   payload: error,
})

export const getTasks = (path) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${API_ENDPOINT}task/${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => dispatch(tasksSuccess(data.result)))
    .catch((error) => dispatch(tasksFailure(error)));
};

export const deleteTask = (id) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${API_ENDPOINT}task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(tasksFailure(error)));
};