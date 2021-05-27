import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/Splash";
import MainScreen from "../screens/Main";

const Stack = createStackNavigator();

interface Props {
  screenName: string;
  screenProps: any;
}

function AppNavigator(props: Props) {
  const { screenName, screenProps } = props;
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName={screenName || "Splash"}
        headerMode="none"
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          initialParams={screenProps || {}}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          initialParams={screenProps || {}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
