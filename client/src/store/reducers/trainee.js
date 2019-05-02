import { FETCH_TASKS, UPDATE_TASKS, ADD_TASKS } from "../actions/actionTypes";


const isEmpty = require("is-empty");
const initialState = {
    tasks:[]
};
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TASKS:
        let target = Object.assign([], action.payload.data)
            return {
                ...state,
                tasks: target
            };
        case UPDATE_TASKS:
            let updatedTasks = Object.assign([], action.payload)
            return {
                ...state,
                tasks:updatedTasks
            }
        default:
            return state;
    }
}

