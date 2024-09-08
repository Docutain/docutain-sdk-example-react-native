/**
 *   Docutain SDK React Native
 *   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
 *
 *   Docutain SDK React Native is a commercial product and requires a license.
 *   Details found in the LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {Settings} from './Settings';

interface SwitchProps {
  title: string;
  description: string;
  settingsKey: string;
}

interface SwitchState {
  value: boolean;
}

export class DocutainSwitch extends React.Component<SwitchProps, SwitchState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: false,
    };
    this.Load();
  }

  Settings = new Settings();

  async Load() {
    this.setState({
      value: await this.Settings.getConfig(this.props.settingsKey),
    });
  }

  IsEnabled() {
    return this.state.value;
  }

  async setSwitch(val: any) {
    this.setState({value: val});
    await this.Settings.saveConfig(this.props.settingsKey, val);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.colText}>
          <Text style={styles.titleText}>{this.props.title}</Text>
          <Text>{this.props.description}</Text>
        </View>
        <View style={styles.colToggle}>
          <Switch testID={this.props.settingsKey}  
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={val => {
              this.setSwitch(val);
            }}
            {...this.props}
            value={this.IsEnabled()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  colText: {
    width: '80%',
    color: '#000000',
    paddingLeft: 10,
  },
  colToggle: {
    width: '20%',
    paddingTop: 10,
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start', // Have View be same width as Text inside
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default DocutainSwitch;
