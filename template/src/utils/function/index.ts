import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IS_FIRST_TIME_OPEN_APP} from '../constant';

export function getJSBundlePath(packageName: string) {
  return `${RNFS.DocumentDirectoryPath}/${packageName}/CodePush/main`;
}

export async function isOpenAppFisrtTime() {
  try {
    const isFisrtTime = await AsyncStorage.getItem(IS_FIRST_TIME_OPEN_APP);
    return isFisrtTime ? isFisrtTime === 'YES' : true;
  } catch (error) {
    return true;
  }
}

export function nofityPassOpenAppFirstTime() {
  AsyncStorage.setItem(IS_FIRST_TIME_OPEN_APP, 'NO');
}
