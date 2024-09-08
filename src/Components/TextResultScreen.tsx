/**
 *   Docutain SDK React Native
 *   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
 *
 *   Docutain SDK React Native is a commercial product and requires a license.
 *   Details found in the LICENSE file in the root directory of this source tree.
 */

import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import DocutainSDK from '@docutain/react-native-docutain-sdk';

interface InputProps {}

interface TextResultState {
  text: string;
}

export class TextResultScreen extends Component<InputProps, TextResultState> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: '',
    };
  }

  async componentDidMount() {
    //get the text of all currently loaded pages
    //if you want text of just one specific page, define the page number
    //see [https://docs.docutain.com/docs/react-native/textDetection] for more details
    const text = await DocutainSDK.getText();
    console.log('TextResultScreen Response:' + text);
    this.setState({text: text});
  }

  render() {
    return (
      <View style={{margin: 10}}>
        <ScrollView>
          <Text testID="text-result">{this.state.text}</Text>
        </ScrollView>
      </View>
    );
  }
}
