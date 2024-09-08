/**
 *   Docutain SDK React Native
 *   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
 *
 *   Docutain SDK React Native is a commercial product and requires a license.
 *   Details found in the LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button, Modal} from 'react-native';
import {Settings} from './Settings';
import ColorPicker from 'react-native-wheel-color-picker';

interface ColorPickerProps {
  title: string;
  description: string;
  settingsKey: string;
}

interface ColorPickerState {
  value: boolean;
  colorLight: any;
  colorDark: any;
  selectedColor: any;
  initialColor: any;
  showModal: boolean;
  isColorLight: boolean;
}

export class DocutainColorPicker extends React.Component<
  ColorPickerProps,
  ColorPickerState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: false,
      colorLight: '#fff',
      colorDark: '#fff',
      selectedColor: '#fff',
      initialColor: '#fff',
      showModal: false,
      isColorLight: false,
    };
    this.load();
  }

  Settings = new Settings();

  async load() {
    this.setState({
      colorLight: await this.Settings.getConfig(
        this.props.settingsKey + '_Light',
      ),
    });
    this.setState({
      colorDark: await this.Settings.getConfig(
        this.props.settingsKey + '_Dark',
      ),
    });
  }

  async onSelectColor(isLight: boolean) {
    this.setState({showModal: true});
    this.setState({isColorLight: isLight});

    if (this.state.isColorLight === true)
      this.setState({initialColor: this.state.colorLight});
    else this.setState({initialColor: this.state.colorDark});
  }

  async onColorOK() {
    if (this.state.isColorLight === true)
      this.setState({colorLight: this.state.selectedColor});
    else this.setState({colorDark: this.state.selectedColor});

    if (this.state.isColorLight)
      await this.Settings.saveConfig(
        this.props.settingsKey + '_Light',
        this.state.selectedColor
      );
    else
      await this.Settings.saveConfig(
        this.props.settingsKey + '_Dark',
        this.state.selectedColor
      );

    this.setState({showModal: false});
  }

  onColorChangeComplete = async color => {
    this.setState({selectedColor: color});
  };

  onColorCancel() {
    this.setState({showModal: false});
  }

  render() {
    return (
      <View>
        <View>
          <Modal visible={this.state.showModal} transparent={true}>
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <ColorPicker
                  thumbSize={40}
                  sliderSize={40}
                  noSnap={true}
                  row={false}
                  onColorChangeComplete={this.onColorChangeComplete}
                  color={this.state.initialColor}
                  useNativeDriver={false}
                  useNativeLayout={false}
                />
                <View style={styles.buttonContainer}>
                  <TouchableHighlight style={styles.button}>
                    <Button
                      title="OK"
                      color="#4CAF50"
                      onPress={() => this.onColorOK()}></Button>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.button}>
                    <Button
                      title="Cancel"
                      color="#848484"
                      onPress={() => this.onColorCancel()}></Button>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.container}>
          <View style={styles.colText}>
            <Text style={styles.titleText}>{this.props.title}</Text>
            <Text>{this.props.description}</Text>
          </View>
          <View style={styles.colCircels}>
            <View>
              <TouchableHighlight testID={this.props.settingsKey+"_Light"}
                onPress={() => this.onSelectColor(true)}
                style={[
                  styles.circle,
                  {backgroundColor: this.state.colorLight},
                ]}>
                <Text></Text>
              </TouchableHighlight>
              <Text style={styles.circleText}>Light</Text>
            </View>
            <View>
              <TouchableHighlight testID={this.props.settingsKey + "_Dark"}
                onPress={() => this.onSelectColor(false)}
                style={[
                  styles.circle,
                  {backgroundColor: this.state.colorDark},
                ]}>
                <Text></Text>
              </TouchableHighlight>
              <Text style={styles.circleText}>&nbsp;Dark</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 8,
    borderColor: '#000000aa',
    borderWidth: 1,
    height: '80%',
  },
  buttonContainer: {
    marginTop: 30,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  button: {
    width: 80,
    margin: 5,
    marginLeft: 'auto',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  colText: {
    width: '75%',
    color: '#000000',
    paddingLeft: 10,
  },
  colCircels: {
    width: '25%',
    paddingTop: 10,
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    paddingBottom: 10,
    paddingTop: 10,
  },
  circle: {
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  circleText: {
    width: 35,
    height: 30,
  },
});

export default DocutainColorPicker;
