import { SET_CURRENT_USER, USER_LOADING } from "../actions/actionTypes";

const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
    let target = Object.assign({},action.payload)
      return {
        ...state,
        user:target,
        isAuthenticated: !isEmpty(action.payload),
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
