/**
 *   Docutain SDK React Native
 *   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
 *
 *   Docutain SDK React Native is a commercial product and requires a license.
 *   Details found in the LICENSE file in the root directory of this source tree.
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import {styles} from './Styles';
import DocutainSwitch from './DocutainSwitch';
import DocutainColorPicker from './DocutainColorPicker';
import DocutainDropdown from './DocutainDropdown';
import {Settings} from './Settings';

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    marginTop: 10,
    paddingBottom: 10,
  },
  divider: {
    backgroundColor: '#d9d7d9',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    paddingLeft: 10,
    height: 40,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  colText: {
    width: '80%',
    color: '#000000',
    paddingLeft: 10,
  },
  colButton: {
    width: '20%',
    paddingTop: 10,
  },
});

export class SettingsScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }

  Settings = new Settings();

  async onReset() {
    await this.Settings.reset();
    this.props.navigation.goBack();
    this.props.navigation.push('Settings');
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={{margin: 10}}>
            <View style={pageStyles.divider}>
              <Text style={styles.buttonHeaderText}>Scan settings</Text>
            </View>
            <DocutainSwitch
              title="Allow capture mode setting"
              description="If true, the document scanner toolbar will display an item that allows the user to switch between automatic and manual camera triggering."
              settingsKey="AllowCaptureModeSetting"></DocutainSwitch>
            <DocutainSwitch
              title="Auto capture"
              description="If true, the camera will capture the image automatically at the right moment."
              settingsKey="AutoCapture"></DocutainSwitch>
            <DocutainSwitch
              title="Auto crop"
              description="If true, image gets automatically cropped if document was detected. This applies only when importing images."
              settingsKey="AutoCrop"></DocutainSwitch>
            <DocutainSwitch
              title="Multi page"
              description="If true, scanning multi page documents is possible. Set this to false if you need to scan single page documents."
              settingsKey="MultiPage"></DocutainSwitch>
            <DocutainSwitch
              title="Pre capture focus"
              description="If true, the camera will run a focus action right before taking the image. This improves the quality of the scanned images, but depending on the device, image capture might take a little bit longer. This applies only to Android."
              settingsKey="PreCaptureFocus"></DocutainSwitch>
            <DocutainDropdown
              title={'Default scan filter'}
              description={
                'The default scan filter that will be used after scan.'
              }
              settingsKey="ScanFilter"
              data={[
                {label: 'Auto', value: 'AUTO'},
                {label: 'Gray', value: 'GRAY'},
                {label: 'Black & White', value: 'BLACKWHITE'},
                {label: 'Original', value: 'ORIGINAL'},
                {label: 'Text', value: 'TEXT'},
                {label: 'Auto 2', value: 'AUTO2'},
                {label: 'Illustration', value: 'ILLUSTRATION'},
              ]}></DocutainDropdown>
            <View style={pageStyles.divider}>
              <Text style={styles.buttonHeaderText}>Edit settings</Text>
            </View>
            <DocutainSwitch
              title="Allow page filter"
              description="If false, the bottom toolbar will hide the filter page item."
              settingsKey="AllowPageFilter"></DocutainSwitch>
            <DocutainSwitch
              title="Allow page rotation"
              description="If false, the bottom toolbar will hide the rotate page item."
              settingsKey="AllowPageRotation"></DocutainSwitch>
            <DocutainSwitch
              title="Allow page arrangement"
              description="If false, the bottom toolbar will hide the arrange page item."
              settingsKey="AllowPageArrangement"></DocutainSwitch>
            <DocutainSwitch
              title="Allow page cropping"
              description="If false, the bottom toolbar will hide the page cropping item."
              settingsKey="AllowPageCropping"></DocutainSwitch>
            <DocutainSwitch
              title="Page arrangement show delete button"
              description="If true, each item of the page arrangement functionality will show a delete button."
              settingsKey="PageArrangementShowDeleteButton"></DocutainSwitch>
            <DocutainSwitch
              title="Page arrangement show page number"
              description="If true, each item of the page arrangement functionality will show the page number."
              settingsKey="PageArrangementShowPageNumber"></DocutainSwitch>
            <View style={pageStyles.divider}>
              <Text style={styles.buttonHeaderText}>Color settings</Text>
            </View>
            <DocutainColorPicker
              title="Color primary"
              description="Used to tint progress indicators and dialog buttons."
              settingsKey="ColorPrimary"></DocutainColorPicker>
            <DocutainColorPicker
              title="Color secondary"
              description="Used to tint selectable controls and the capture button."
              settingsKey="ColorSecondary"></DocutainColorPicker>
            <DocutainColorPicker
              title="Color on secondary"
              description="Used to tint elements that reside on ColorSecondary, like the icon of the capture button."
              settingsKey="ColorOnSecondary"></DocutainColorPicker>
            <DocutainColorPicker
              title="Color scan buttons layout background"
              description="Used to tint the background of the layout containing the buttons of the scan layout, like the capture button or torch button."
              settingsKey="ColorScanButtonsLayoutBackground"></DocutainColorPicker>
            <DocutainColorPicker
              title="Color scan buttons foreground"
              description="Used to tint the foreground of the buttons of the scan layout, like the torch button."
              settingsKey="ColorScanButtonsForeground"></DocutainColorPicker>
            <DocutainColorPicker
              title="Color scan polygon"
              description="Used to tint the polygon overlay which highlights the currently detected document."
              settingsKey="ColorScanPolygon"></DocutainColorPicker>
            <DocutainColorPicker
              title="Color bottom bar background"
              description="Used to tint the bottom toolbar background of the image editing page."
              settingsKey="ColorBottomBarBackground"></DocutainColorPicker>
            <DocutainColorPicker
              title="Color bottom bar foreground"
              description="Used to tint the buttons within the bottom toolbar of the image editing page."
              settingsKey="ColorBottomBarForeground"></DocutainColorPicker>
            <DocutainColorPicker
              title="Color top bar background"
              description="Used to tint the top toolbar background."
              settingsKey="ColorTopBarBackground"></DocutainColorPicker>
            <DocutainColorPicker
              title="Color top bar foreground"
              description="Used to tint the elements contained in the top toolbar, like buttons and titles."
              settingsKey="ColorTopBarForeground"></DocutainColorPicker>
            <View style={pageStyles.divider}>
              <Text style={styles.buttonHeaderText}>Reset</Text>
            </View>
            <View style={pageStyles.container}>
              <View style={pageStyles.colText}>
                <Text>Reset all settings to the default values</Text>
              </View>
              <View style={pageStyles.colButton}>
                <Button onPress={() => this.onReset()} title="Reset"></Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
