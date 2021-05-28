import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IS_FIRST_TIME_OPEN_APP} from '../constant';
import {checkVersionMultiMiniApp} from 'react-native-mini-app-view';
import {ENV} from '../../configs/environment';
import {miniApps} from '../../../app.json';

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

export function onUpdateMiniAppsBegin(values: any) {
  console.log('onUpdateBegin: ', values);
}

export function onUpdateMiniAppsError(error: any) {
  console.log('onUpdateError: ', error);
}

export function onUpdateMiniAppsFinish(res: any) {
  console.log('onUpdateFinish: ', res);
}

export function checkUpdateAllMiniApp() {
  return checkVersionMultiMiniApp(ENV, miniApps, {
    onGetLocalPackageError: (error: any) => {
      console.log('onGetLocalPackageError: ', error);
    },
    onGetRemotePackageError: (error: any) => {
      console.log('onGetRemotePackageError: ', error);
    },
    onSaveRemotePackageInfoError: (error: any) => {
      console.log('onSaveRemotePackageInfoError: ', error);
    },
  }) as Promise<any>;
}
