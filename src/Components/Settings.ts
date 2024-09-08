/**
 *   Docutain SDK React Native
 *   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
 *
 *   Docutain SDK React Native is a commercial product and requires a license.
 *   Details found in the LICENSE file in the root directory of this source tree.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {DocutainColor, DocumentScannerConfiguration} from '@docutain/react-native-docutain-sdk';

const DefaultSettings: {[key: string]: any} = {
  AllowCaptureModeSetting: false,
  AutoCapture: true,
  AutoCrop: true,
  MultiPage: true,
  PreCaptureFocus: true,
  AllowPageFilter: true,
  AllowPageRotation: true,
  AllowPageArrangement: true,
  AllowPageCropping: true,
  PageArrangementShowDeleteButton: false,
  PageArrangementShowPageNumber: true,
  ScanFilter: 'ILLUSTRATION',
  ColorPrimary_Light: '#4CAF50',
  ColorPrimary_Dark: '#4CAF50',
  ColorSecondary_Light: '#4CAF50',
  ColorSecondary_Dark: '#4CAF50',
  ColorOnSecondary_Light: '#FFFFFF',
  ColorOnSecondary_Dark: '#000000',
  ColorScanButtonsLayoutBackground_Light: '#121212',
  ColorScanButtonsLayoutBackground_Dark: '#121212',
  ColorScanButtonsForeground_Light: '#FFFFFF',
  ColorScanButtonsForeground_Dark: '#FFFFFF',
  ColorScanPolygon_Light: '#4CAF50',
  ColorScanPolygon_Dark: '#4CAF50',
  ColorBottomBarBackground_Light: '#FFFFFF',
  ColorBottomBarBackground_Dark: '#212121',
  ColorBottomBarForeground_Light: '#323232',
  ColorBottomBarForeground_Dark: '#BEBEBE',
  ColorTopBarBackground_Light: '#4CAF50',
  ColorTopBarBackground_Dark: '#2A2A2A',
  ColorTopBarForeground_Light: '#FFFFFF',
  ColorTopBarForeground_Dark: '#E3E3E3',
};

export class Settings {
  async getConfig(settingsKey: string): Promise<any> {
    var value: any = null;
    try {
      var val: any = await AsyncStorage.getItem(settingsKey)
      if (val != null) 
      {
        value = JSON.parse(val);
        console.log('getConfig key: ' + settingsKey + ' value: ' + value);
        return value;
      }
    } catch (e) {
      console.log('getConfig ' + settingsKey + 'Exception:' + e);
    }
    var value: any = DefaultSettings[settingsKey];
    if(value == null)
    {
      console.log('ERROR getConfig key: ' + settingsKey + ' not valid');
      return null;
    }

    console.log('getConfig key: ' + settingsKey + ' Defaultvalue: ' + value);
    return value;
  }


  //In this sample app we provide a settings page which the user can use to alter the scan settings
  //The settings are stored in and read from SharedPreferences
  //This is supposed to be just an example, you do not need to implement it in that exact way
  //If you do not want to provide your users the possibility to alter the settings themselves at all
  //You can just set the settings according to the apps needs

  

  async getScannerConfiguration(): Promise<DocumentScannerConfiguration> {
    var options: DocumentScannerConfiguration = {

    //set scan settings
    //see [https://docs.docutain.com/docs/react-native/docScan#change-default-scan-behaviour] for more information

    allowCaptureModeSetting: await this.getConfig('AllowCaptureModeSetting'),
    autoCapture: await this.getConfig('AutoCapture'),
    autoCrop: await this.getConfig('AutoCrop'),
    multiPage: await this.getConfig('MultiPage'),
    preCaptureFocus: await this.getConfig('PreCaptureFocus'),
    defaultScanFilter: await this.getConfig('ScanFilter'),
  
    //set edit settings
    //see [https://docs.docutain.com/docs/react-native/docScan#pageeditconfiguration] for more information        

    pageEditConfig: {
      allowPageFilter: await this.getConfig('AllowPageFilter'),
      allowPageRotation: await this.getConfig('AllowPageRotation'),
      allowPageArrangement: await this.getConfig('AllowPageArrangement'),
      allowPageCropping: await this.getConfig('AllowPageCropping'),
      pageArrangementShowDeleteButton: await this.getConfig('PageArrangementShowDeleteButton'),
      pageArrangementShowPageNumber: await this.getConfig('PageArrangementShowPageNumber'),
    },
  
    //set color settings
    //see [https://docs.docutain.com/docs/react-native/theming] for more information    

    ColorConfig: {
      ColorPrimary: await this.getColorConfig('ColorPrimary'),
      ColorSecondary: await this.getColorConfig('ColorSecondary'),
      ColorOnSecondary: await this.getColorConfig('ColorOnSecondary'),
      ColorScanButtonsLayoutBackground: await this.getColorConfig('ColorScanButtonsLayoutBackground'),
      ColorScanButtonsForeground: await this.getColorConfig('ColorScanButtonsForeground'),
      ColorScanPolygon: await this.getColorConfig('ColorScanPolygon'),
      ColorBottomBarBackground: await this.getColorConfig('ColorBottomBarBackground'),
      ColorBottomBarForeground: await this.getColorConfig('ColorBottomBarForeground'),
      ColorTopBarBackground: await this.getColorConfig('ColorTopBarBackground'),
      ColorTopBarForeground: await this.getColorConfig('ColorTopBarForeground')
    }};
    return options;
  };
  
  async getColorConfig(settingsKey: string): Promise<DocutainColor> {
    var Color: DocutainColor = {
      Light: await this.getConfig(settingsKey + '_Light'),
      Dark: await this.getConfig(settingsKey + '_Dark')
    } 
    return Color;
  }  

  async saveConfig(settingsKey: string, value: any) {
    try {
      await AsyncStorage.setItem(settingsKey, JSON.stringify(value));
    } catch (e) {
      console.log('saveConfig Exception:' + e);
    }
    console.log('saveConfig key: ' + settingsKey + ' value: ' + value);
  }

  async reset() {
    for (const [settingsKey, value] of Object.entries(DefaultSettings)) {
      await this.saveConfig(settingsKey, value);
    }
  }
}
