/**
 *   Docutain SDK React Native
 *   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
 *
 *   Docutain SDK React Native is a commercial product and requires a license.
 *   Details found in the LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {Alert, Linking, BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from './Components/HomeScreen';
import {AnalyzeResultScreen} from './Components/AnalyzeResultScreen';
import {TextResultScreen} from './Components/TextResultScreen';
import {SettingsScreen} from './Components/SettingsScreen';
import {ErrorHandlingUtils} from './Components/ErrorHandlingUtils';
import DocutainSDK, {  AnalyzeConfiguration } from '@docutain/react-native-docutain-sdk';


const Stack = createNativeStackNavigator();
const License_Key = "<YOUR_LICENSE_KEY_HERE>";

export class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.InitDocutainSDK();
  }

  async showTrialLicenseAlert() {
    Alert.alert('Error', 'A valid trial license key is required. You can generate a trial license key for\n\ncom.docutain_sdk_example_react_native\n\non our website.',
      [
        {
          text: 'Cancel',
          onPress: () => BackHandler.exitApp(),
          style: 'cancel',
        },
        {
          text: 'Get trial license',
          onPress: () => {
            Linking.openURL('https://sdk.docutain.com/TrialLicense?Source=2621959');
            BackHandler.exitApp();
          },
        },
      ],
    );
  }

  async InitDocutainSDK() {
    try {
      // the Docutain SDK needs to be initialized prior to using any functionality of it
      // a valid license key is required (contact us via [mailto:sdk@Docutain.com] to get a trial license and replace <YOUR_LICENSE_KEY_HERE>

      if (!(await DocutainSDK.initSDK(License_Key))) {
        if (License_Key == '<YOUR_LICENSE_KEY_HERE>') {
          //init of Docutain SDK failed, no trial license provided
          await this.showTrialLicenseAlert();
        } else {
          //init of Docutain SDK failed, get the last error message
          return await ErrorHandlingUtils.DocutainError('initSDK');
        }
      }
      //If you want to use text detection (OCR) and/or data extraction features, you need to set the AnalyzeConfiguration
      //in order to start all the necessary processes
      const analyzeConfig: AnalyzeConfiguration = {
        readBIC: true,
        readPaymentState: true
      };

      if (!DocutainSDK.setAnalyzeConfiguration(analyzeConfig)) {
        return await ErrorHandlingUtils.DocutainError('setAnalyzeConfiguration');
      }

      //Depending on your needs, you can set the Logger's level
      DocutainSDK.setLogLevel('VERBOSE');

      //Depending on the log level that you have set, some temporary files get written on the filesystem
      //You can delete all temporary files by using the following method
      if (!DocutainSDK.deleteTempFiles(true)) {
        return await ErrorHandlingUtils.DocutainError('DeleteTempFiles');
      }
      return true;
    } catch (e) {
      ErrorHandlingUtils.exception('InitDocutainSDK', e);
    }
    return false;
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Docutain SDK Example',
              headerStyle: {backgroundColor: '#4caf50'},
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="AnalyzeResult"
            component={AnalyzeResultScreen}
            options={{
              title: 'Docutain SDK - AnalyzeResult',
              headerStyle: {backgroundColor: '#4caf50'},
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="TextResult"
            component={TextResultScreen}
            options={{
              title: 'Docutain SDK - Text',
              headerStyle: {backgroundColor: '#4caf50'},
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: 'Docutain SDK - Settings',
              headerStyle: {backgroundColor: '#4caf50'},
              headerTintColor: 'white',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// @ts-ignore
export default App;
