
import { combineReducers } from "redux";
import movieReducer from "./movieReducer"; // Ensure this file exists in `src/redux/reducers`

const rootReducer = combineReducers({
  movies: movieReducer,
});

export default rootReducer;
