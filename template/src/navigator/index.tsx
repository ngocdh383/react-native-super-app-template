import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/Splash';
import MainScreen from '../screens/Main';
import DemoMiniAppScreen from '../screens/DemoMiniApp';
import {checkVersionMultiMiniApp} from 'react-native-mini-app-view';
import {ENV} from '../configs/environment';
import {miniApps} from '../../app.json';
import {isOpenAppFisrtTime} from '../utils/function';

function onUpdateMiniAppsBegin(values: any) {
  console.log('onUpdateBegin: ', values);
}

function onUpdateMiniAppsError(error: any) {
  console.log('onUpdateError: ', error);
}

function onUpdateMiniAppsFinish(res: any) {
  console.log('onUpdateFinish: ', res);
}

async function onReady() {
  const isFisrtTime = await isOpenAppFisrtTime();
  if (!isFisrtTime) {
    // console.log('onReady: check because no first time');
    checkVersionMultiMiniApp(ENV, miniApps, {
      onGetLocalPackageError: (error: any) => {
        console.log('onGetLocalPackageError: ', error);
      },
      onGetRemotePackageError: (error: any) => {
        console.log('onGetRemotePackageError: ', error);
      },
      onSaveRemotePackageInfoError: (error: any) => {
        console.log('onSaveRemotePackageInfoError: ', error);
      },
    })
      .then((result: any) => {
        const {appsUpdateOnline, appsUpdateOffline, updateApps} = result;
        if (appsUpdateOnline.length > 0) {
          console.log('Cần update from online: ', appsUpdateOnline);
        } else {
          console.log('Không cần update from online');
        }

        if (appsUpdateOffline.length > 0) {
          console.log('Cần update from offline: ', appsUpdateOffline);
        } else {
          console.log('Không cần update from offline');
        }

        const all = [...appsUpdateOnline, ...appsUpdateOffline];
        if (all.length > 0) {
          updateApps(all, {
            onUpdateBegin: onUpdateMiniAppsBegin,
            onUpdateError: onUpdateMiniAppsError,
            onUpdateFinish: onUpdateMiniAppsFinish,
          })
            .then((values: any) => {
              console.log('updateApps-success: ', values);
            })
            .catch((error: any) => {
              console.log('updateApps-error: ', error.message);
            });
        }
      })
      .catch((error: any) => {
        console.log('checkVersionMultiMiniApp: ', error);
      });
  }
}

const Stack = createStackNavigator();

function AppNavigator(props: any) {
  return (
    <NavigationContainer independent={true} onReady={onReady}>
      <Stack.Navigator initialRouteName={'Splash'} headerMode="none">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="DemoMiniApp" component={DemoMiniAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
