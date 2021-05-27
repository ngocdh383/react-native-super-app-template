import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {checkVersionMultiMiniApp} from 'react-native-mini-app-view';
import {miniApps} from '../../../app.json';
import {
  isOpenAppFisrtTime,
  nofityPassOpenAppFirstTime,
} from '../../utils/function';
import {ENV} from '../../configs/environment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props extends StackScreenProps<ParamListBase> {}

interface State {}

class SplashScreenComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  _goToNextScreen = () => {
    const {navigation} = this.props;
    navigation.replace('Main');
  };

  // Update lifecycle callbacks
  _onUpdateMiniAppsBegin = (values: any) => {
    console.log('onUpdateBegin: ', values);
  };

  _onUpdateMiniAppsError = (error: any) => {
    console.log('onUpdateError: ', error);
  };

  _onUpdateMiniAppsFinish = (res: any) => {
    console.log('onUpdateFinish: ', res);
  };

  _handleUpdateMiniAppsVersion = async () => {
    const isFisrtTime = await isOpenAppFisrtTime();
    if (isFisrtTime) {
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
              onUpdateBegin: this._onUpdateMiniAppsBegin,
              onUpdateError: this._onUpdateMiniAppsError,
              onUpdateFinish: this._onUpdateMiniAppsFinish,
            })
              .then((values: any) => {
                nofityPassOpenAppFirstTime();
                this._goToNextScreen();
              })
              .catch((error: any) => {
                console.log('updateApps-error: ', error.message);
              });
          } else {
            this._goToNextScreen();
          }
        })
        .catch((error: any) => {
          console.log('checkVersionMultiMiniApp-error: ', error.message);
        });
    } else {
      this._goToNextScreen();
    }
  };

  componentDidMount = () => {
    this._handleUpdateMiniAppsVersion();
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 100, height: 100}}
          source={require('../../assets/icons/app-logo.png')}
        />
      </View>
    );
  }
}

const SplashScreen = SplashScreenComponent;

export default SplashScreen;
