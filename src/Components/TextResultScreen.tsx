import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import DocutainSDK from '@docutain/react-native-docutain-sdk';

interface InputProps {
}

interface TextResultState {
  text:string,
}

export class TextResultScreen extends Component <InputProps, TextResultState> {
    constructor(props: any) {
      super(props);
      this.state = {
        text: ""
      }
    }  

    async componentDidMount() {
      //get the text of all currently loaded pages
      //see [https://docs.docutain.com/docs/react-native/textDetection] for more details      
      const text = await DocutainSDK.getText();
      console.log('TextResultScreen Response:' + text)
        this.setState({text:text})
      }    

  render() {
    return (
      <View style={{margin:10}}>
      <ScrollView>
      <Text>{this.state.text}</Text>
      </ScrollView>
      </View>
      );
  }
}


