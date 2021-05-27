import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  navigation: any;
}

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
        <Button
          title="Go to Mini App demo"
          onPress={() => {
            this.props.navigation.navigate('DemoMiniApp');
          }}
        />
      </View>
    );
  }
}

const MainScreen = MainScreenComponent;

export default MainScreen;
