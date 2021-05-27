import { combineEpics } from "redux-observable";
import rootEpic from "./root/epic";
const appEpic = combineEpics(
  rootEpic,
);

export default appEpic;