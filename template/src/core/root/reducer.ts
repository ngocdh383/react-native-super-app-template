import { PlainAction } from "redux-typed-actions";
export interface RootState {}

const INIT_STATE: RootState = {};

function rootReducer(state: RootState = INIT_STATE, action: PlainAction) {
  switch (action.type) {
    default:
      return state;
  }
}

export default rootReducer;
