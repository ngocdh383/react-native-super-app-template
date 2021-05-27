import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./src/core";
import AppNavigator from "./src/navigator";

interface Props {
  screenName: string;
  screenProps: any;
}

interface State {}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { screenName, screenProps } = this.props;
    return (
      <Provider store={store}>
        <AppNavigator screenName={screenName} screenProps={screenProps} />
      </Provider>
    );
  }
}
