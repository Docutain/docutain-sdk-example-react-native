/**
 *   Docutain SDK React Native
 *   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
 *
 *   Docutain SDK React Native is a commercial product and requires a license.
 *   Details found in the LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Settings} from './Settings';

interface DropdownProps {
  title: string;
  description: string;
  settingsKey: string;
  data: any;
}

interface DropdownState {
  value: string;
}

export class DocutainDropdown extends React.Component<
  DropdownProps,
  DropdownState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
    };
    this.Load();
  }

  Settings = new Settings();

  async Load() {
    this.setState({
      value: await this.Settings.getConfig(this.props.settingsKey),
    });
  }

  async setValue(val: any) {
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
          <RNPickerSelect
            value={this.state.value}
            onValueChange={value => {
              this.setValue(value);
            }}
            items={this.props.data}
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
    width: '50%',
    color: '#000000',
    paddingLeft: 10,
  },
  colToggle: {
    width: '50%',
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

export default DocutainDropdown;
