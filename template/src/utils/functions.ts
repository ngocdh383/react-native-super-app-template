import { NativeModules } from "react-native";
import { name } from "../../app.json";

const { MiniAppViewManager } = NativeModules;

/**
 * @description Check whether Mini App is running standalone or running in Super App
 * @return {boolean} Returns true if this mini app is running in super app, else false.
 */
export function isRunningInSuperApp() {
  return !!MiniAppViewManager;
}

/**
 * @description Go back super app from mini app
 */
export function goBackSuperApp() {
  MiniAppViewManager?.goBack(name);
}
