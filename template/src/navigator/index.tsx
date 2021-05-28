import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/Splash';
import MainScreen from '../screens/Main';
import DemoMiniAppScreen from '../screens/DemoMiniApp';
import {
  checkUpdateAllMiniApp,
  isOpenAppFisrtTime,
  onUpdateMiniAppsBegin,
  onUpdateMiniAppsError,
  onUpdateMiniAppsFinish,
} from '../utils/function';

async function onReady() {
  const isFisrtTime = await isOpenAppFisrtTime();
  if (!isFisrtTime) {
    try {
      const result = await checkUpdateAllMiniApp();
      const {appsUpdateOnline, appsUpdateOffline, updateApps} = result;
      if (appsUpdateOnline.length > 0) {
        console.log('Mini apps need online update: ', appsUpdateOnline);
      }

      if (appsUpdateOffline.length > 0) {
        console.log('Mini apps need offline update: ', appsUpdateOffline);
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
    } catch (error) {
      console.log('checkVersionMultiMiniApp: ', error);
    }
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
