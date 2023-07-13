/** 
*   Docutain SDK React Native
*   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
*
*   Docutain SDK React Native is a commercial product and requires a license. 
*   Details found in the LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from './Components/HomeScreen';
import {AnalyzeResultScreen} from './Components/AnalyzeResultScreen';
import {TextResultScreen} from './Components/TextResultScreen';
import {ErrorHandlingUtils} from './Components/ErrorHandlingUtils';
import DocutainSDK, {AnalyzeConfiguration} from '@docutain/react-native-docutain-sdk';

const Stack = createNativeStackNavigator();

export class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.InitDocutainSDK();
}

   async InitDocutainSDK() {
    try {
      // the Docutain SDK needs to be initialized prior to using any functionality of it
      // a valid license key is required (contact us via [mailto:sdk@Docutain.com] to get a trial license and replace <YOUR_LICENSE_KEY_HERE>
      if(!await DocutainSDK.initSDK("<YOUR_LICENSE_KEY_HERE>")){
          //init of Docutain SDK failed, get the last error message
          return await ErrorHandlingUtils.DocutainError('initSDK');
      }

      //If you want to use text detection (OCR) and/or data extraction features, you need to set the AnalyzeConfiguration
      //in order to start all the necessary processes
      const analyzeConfig: AnalyzeConfiguration = {
        readBIC: true,
        readPaymentState: true
      }

      if(!DocutainSDK.setAnalyzeConfiguration(analyzeConfig)){
        return await ErrorHandlingUtils.DocutainError('setAnalyzeConfiguration');
      }

      //Depending on your needs, you can set the Logger's level
      DocutainSDK.setLogLevel("VERBOSE")

      //Depending on the log level that you have set, some temporary files get written on the filesystem
      //You can delete all temporary files by using the following method
      if(!DocutainSDK.deleteTempFiles(true)){
        return await ErrorHandlingUtils.DocutainError('DeleteTempFiles');
      }     
      return true;
    } 
    catch (e) {
      ErrorHandlingUtils.exception("InitDocutainSDK",e);
    }
    return false;
  };    

  render() {
    return (
    <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Docutain SDK Example', headerStyle: {backgroundColor: 'green'}, headerTintColor: 'white'}}
        />
        <Stack.Screen 
          name="AnalyzeResult" 
          component={AnalyzeResultScreen} 
          options={{title: 'Docutain SDK - AnalyzeResult', headerStyle: {backgroundColor: 'green'}, headerTintColor: 'white'}}
          />
        <Stack.Screen 
          name="TextResult" 
          component={TextResultScreen}
          options={{title: 'Docutain SDK - Text', headerStyle: {backgroundColor: 'green'}, headerTintColor: 'white'}}
          />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

// @ts-ignore
export default App;
