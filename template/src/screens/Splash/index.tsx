import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import ic_app_logo from "../../assets/icons/generated/ic_app_logo";
import { ParamListBase } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface Props extends StackScreenProps<ParamListBase> {}

interface State {}

class SplashScreenComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.replace("Main");
    }, 5000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: 100, height: 100 }} source={ic_app_logo} />
      </View>
    );
  }
}

const SplashScreen = SplashScreenComponent;

export default SplashScreen;
