import { combineEpics, StateObservable, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { PlainAction } from "redux-typed-actions";
import { map } from "rxjs/operators";
import { DemoAction, DemoActionSuccess } from "./actions";
import { ReduxAppState } from "../appReducer";

const demoEpic$ = (
  action$: Observable<PlainAction>,
  state$: StateObservable<ReduxAppState>
): Observable<PlainAction> => {
  return action$.pipe(
    ofType(DemoAction.type),
    map((value) => {
      console.log("demo-tab: ", value);
      return DemoActionSuccess.get();
    })
  );
};

const rootEpic = combineEpics(demoEpic$);
export default rootEpic;
