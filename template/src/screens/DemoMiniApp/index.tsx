import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {MiniAppView} from 'react-native-mini-app-view';
import {miniApps} from '../../../app.json';
import {getJSBundlePath} from '../../utils/function';
import {ReduxAppState} from '../../core/appReducer';
import {PlainAction} from 'redux-typed-actions';
import {connect} from 'react-redux';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from 'react-native-commons-utils';

const {DemoMiniApp} = miniApps;
const {packageName, mainComponentName} = DemoMiniApp;

interface Events {}

interface Props {
  navigation: any;
  route: any;
}

interface State {
  isLoading: boolean;
}

const mapStateToProps = (state: ReduxAppState) => {
  return {};
};

const mapDispatchToProps = (
  dispatch: (action: PlainAction) => void,
): Events => {
  return {};
};

class DemoMiniAppScreenComponent extends Component<Props, State> {
  _miniAppViewRef: MiniAppView | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={'blue'} />
        <Text>Loading...</Text>
      </View>
    );
  };

  render() {
    const {isLoading} = this.state;
    return (
      <View style={styles.container}>
        {isLoading && this.renderLoading()}
        <MiniAppView
          ref={(ref: MiniAppView | null) => (this._miniAppViewRef = ref)}
          style={{flex: 1}}
          onReadyToLoadApp={() =>
            this._miniAppViewRef?.loadApp(mainComponentName, {})
          }
          bundleAssetName={getJSBundlePath(packageName)}
          mainComponentName={mainComponentName}
          onBackPressed={() => this.props.navigation.goBack()}
          onViewLoaded={() => this.setState({isLoading: false})}
          onNavigate={(name: string) => this.props.navigation.navigate(name)}
        />
      </View>
    );
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

const DemoMiniAppScreen = enhancer(DemoMiniAppScreenComponent);

export default DemoMiniAppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
