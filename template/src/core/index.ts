import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import logger from 'redux-logger';
import appReducer from './appReducer';
import appEpic from './appEpic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import {PersistConfig} from 'redux-persist';

const epicMiddleware = createEpicMiddleware();

let enhancer;
if (__DEV__) {
  enhancer = applyMiddleware(logger, epicMiddleware);
} else {
  enhancer = applyMiddleware(epicMiddleware);
}

const persistConfig: PersistConfig<any, any, any, any> = {
  version: 1,
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['rootStore'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);

epicMiddleware.run(appEpic as any);
export default store;
