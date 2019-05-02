import { FETCH_TASKS, UPDATE_TASKS, ADD_TASKS } from "./actionTypes";
import axios from "axios";


export const fetchTasks = (userId) => dispatch => {
    axios
        .get(`http://localhost:4000/api/userTasks/${userId}`)
        .then(res => {
            dispatch({
                type: FETCH_TASKS,
                payload: res
            })
        })
        .catch(err => console.log(err));
};
export const updateTasks = (data) => dispatch => {
    axios
        .put(`http://localhost:4000/api/userTasks/update`, data)
        .then(res => {
            dispatch({
                type: UPDATE_TASKS,
                payload: res.data.tasks
            })
        })
        .catch(err => console.log(err));
}