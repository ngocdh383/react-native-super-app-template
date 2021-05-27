/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {setup} from 'react-native-mini-app-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
setup({
  storage: AsyncStorage,
});

AppRegistry.registerComponent(appName, () => App);
