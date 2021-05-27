import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { isRunningInSuperApp } from "../../utils/functions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface Props {}

interface State {}

class MainScreenComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Main Screen</Text>
        <Text>
          Is Running in super App: {isRunningInSuperApp() ? "true" : "false"}
        </Text>
      </View>
    );
  }
}

const MainScreen = MainScreenComponent;

export default MainScreen;
