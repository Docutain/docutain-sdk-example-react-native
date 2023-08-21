/** 
*   Docutain SDK React Native
*   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
*
*   Docutain SDK React Native is a commercial product and requires a license. 
*   Details found in the LICENSE file in the root directory of this source tree.
*/

import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import Input from './Input'
import DocutainSDK from '@docutain/react-native-docutain-sdk';

export class AnalyzeResultScreen extends Component {
    constructor(props: any) {
      super(props);
      this.state = {
        dataObject: "",
        address:"",
        IBAN:"",
        BIC:"",
      };
    }  

    async componentDidMount() {
      //analyze the currently loaded document and get the detected data
      const analyzeData: string = await DocutainSDK.analyze();
      console.log('AnalyzeResultScreen Response:' + analyzeData)
      //detected data is returned as JSON, so serializing the data in order to extract the key value pairs
      //see [https://docs.docutain.com/docs/react-native/dataExtraction] for more information
      const dataObject = JSON.parse(analyzeData)
      console.log('AnalyzeResultScreen dataObject:' + dataObject)

    this.setState({dataObject:dataObject})
    this.setState({address:dataObject.Address})
    const bank = dataObject.Address.Bank;

    console.log('AnalyzeResultScreen bank:' + bank)
 
    //TODO: handle multiple bank accounts. In the example we only use the first one
    if(dataObject.Address.Bank.length > 0){
      this.setState({IBAN: dataObject.Address.Bank[0].IBAN})
      this.setState({BIC: dataObject.Address.Bank[0].BIC})
    }
  }    
  render() {
    return (
      //load the text into the textfields if value is detected
      <View style={{margin:10}}>
        <ScrollView>
          <Input Label="Name 1" Text={this.state.address.Name1}></Input>
          <Input Label="Name 2" Text={this.state.address.Name2}></Input>
          <Input Label="Name 3" Text={this.state.address.Name3}></Input>
          <Input Label="Zipcode" Text={this.state.address.Zipcode}></Input>
          <Input Label="City" Text={this.state.address.City} ></Input>
          <Input Label="Street" Text={this.state.address.Street} ></Input>
          <Input Label="Phone" Text={this.state.address.Phone} ></Input>
          <Input Label="Customer ID" Text={this.state.address.CustomerId} ></Input>
          <Input Label="IBAN" Text={this.state.IBAN} ></Input>
          <Input Label="BIC" Text={this.state.BIC} ></Input>
          <Input Label="Date" Text={this.state.dataObject.Date} ></Input>
          <Input Label="Amount" Text={this.state.dataObject.Amount} ></Input>
          <Input Label="Invoice ID" Text={this.state.dataObject.InvoiceId} ></Input>
          <Input Label="Reference" Text={this.state.dataObject.Reference} ></Input>
          <Input Label="Payment State" Text={this.state.dataObject.PaymentState} ></Input>
        </ScrollView>
      </View>
      );
  }
}

