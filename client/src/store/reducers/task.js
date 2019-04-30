import { ADD_TASK, REMOVE_TASK, TOGGLE_TASK } from "../../store/actions/actionTypes";

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
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case REMOVE_TASK:
      const numIndex = parseInt(action.id);
      return state.filter(todo => todo.id !== numIndex);
    default:
      return state;
  }
};

export default taskReducer;
