import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";
import appReducer from "./appReducer";
import appEpic from "./appEpic";

const epicMiddleware = createEpicMiddleware();

let enhancer;
if (__DEV__) {
  enhancer = applyMiddleware(logger, epicMiddleware);
} else {
  enhancer = applyMiddleware(epicMiddleware);
}

const store = createStore(appReducer, enhancer);

epicMiddleware.run(appEpic as any);
export default store;
