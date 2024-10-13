
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Ensure `reducers` is a directory inside `src/redux`

const Store = configureStore({
  reducer: rootReducer,
});

export default Store;

