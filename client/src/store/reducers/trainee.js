import { FETCH_TASKS, UPDATE_TASKS, ADD_TASKS, DELETE_TASKS} from "../actions/actionTypes";

const initialState = {
  tasks: []
};
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TASKS:
        let tasks = Object.assign([], action.payload.tasks)
            return {
                ...state,
                tasks: tasks
            };
        case UPDATE_TASKS:
            let updatedTasks = Object.assign([], action.payload)
            return {
                ...state,
                tasks:updatedTasks
            }
        case ADD_TASKS:
            let addTasks = Object.assign([], action.payload);
            return {
                ...state,
                tasks:addTasks
            }
        case DELETE_TASKS:
            let deleteTask = Object.assign([], state.tasks);
            deleteTask = deleteTask.filter(ele=> ele.id!==action.payload);
            return {
                ...state,
                tasks:deleteTask
            }
        default:
            return state;
    }
}
