import { combineReducers } from "redux";
import rootReducer, { RootState } from "./root/reducer";

export interface ReduxAppState {
  rootStore: RootState;
}

const appReducer = combineReducers<ReduxAppState>({
  rootStore: rootReducer,
});

export default appReducer;
