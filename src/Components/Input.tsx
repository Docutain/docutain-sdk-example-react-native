/**
 *   Docutain SDK React Native
 *   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
 *
 *   Docutain SDK React Native is a commercial product and requires a license.
 *   Details found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Optional } from 'utility-types';
import { View, Text, StyleSheet } from "react-native";
import renderIf from 'render-if';

interface InputProps {
    Label:string,
    Text:string,
//    showIfEmpty:boolean,
  }

export class Input extends React.Component <InputProps>{
    constructor(props: any) {
      super(props);
      };       
    
    render() {
        return (
            <View> 
{renderIf(this.props.showIfEmpty == true || this.props.Text)(                    
        <View style={styles.container} >
            <View style={styles.labelContainer}>
                <Text>{this.props.Label}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text testID={this.props.Label}>{this.props.Text}</Text>
            </View>
        </View>
)}        
            </View>         
        )
    };
}

const styles = StyleSheet.create({
    labelContainer: {
        backgroundColor: "white", // Same color as background
        alignSelf: "flex-start", // Have View be same width as Text inside
        paddingHorizontal: 3, // Amount of spacing between border and first/last letter
        marginStart: 10, // How far right do you want the label to start
        zIndex: 1, // Label must overlap border
        elevation: 1, // Needed for android
        shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
        position: "absolute", // Needed to be able to precisely overlap label with border
        top: -12, // Vertical position of label. Eyeball it to see where label intersects border.
    },
    inputContainer: {        
        borderWidth: 1, // Create border
        borderRadius: 4, // Not needed. Just make it look nicer.
        padding: 10, // Also used to make it look nicer
        zIndex: 0, // Ensure border has z-index of 0
        "&:hover": {
            borderColor: "red"
          }
    },
    container: {
        marginVertical:10,
     },
});

export default Input;