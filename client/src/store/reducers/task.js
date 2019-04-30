import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
  SET_VISIBILITY_FILTER,
} from "../../store/actions/actionTypes";

const initialData = [];

const taskReducer = (state = initialData, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case TOGGLE_TASK:
      return state.map(task =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    case REMOVE_TASK:
      const numIndex = parseInt(action.id);
      return state.filter(task => task.id !== numIndex);
    case SET_VISIBILITY_FILTER: {
      return action.filter;
    }
    default:
      return state;
  }
};

export default taskReducer;
