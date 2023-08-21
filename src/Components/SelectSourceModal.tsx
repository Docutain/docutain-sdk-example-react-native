import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import {styles} from  './Styles'
import {DocumentSource} from './model'
import {ErrorHandlingUtils} from './ErrorHandlingUtils';

interface SelectSourceModalProps {
    show: boolean,
    onSelectSource: any,
    onHide: any
}

interface SelectSourceModalStates {
  source: DocumentSource
}

export class SelectSourceModal extends React.Component <SelectSourceModalProps, SelectSourceModalStates>{
    constructor(props: any) {
      super(props);
    }  

    render() {
      return (
      <View>
        <Modal transparent={true} 
        visible={this.props.show}
        animationType="slide"
        onDismiss={() => {
          this.props.onSelectSource(this.state.source);
        }}>
          
          <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitleText}>First, scan or import a document</Text>
            <TouchableOpacity
            style={styles.modalButton}
            onPress={() => this.hide(DocumentSource.Dokumentenscanner)}>
              <Text style={styles.modalButtonText}>Document Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.modalButton}
            onPress={() => this.hide(DocumentSource.PDFImport)}>
              <Text style={styles.modalButtonText}>PDF Import</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.modalButton}
            onPress={() => this.hide(DocumentSource.ImageImport)}>
              <Text style={styles.modalButtonText}>Image Import</Text>
            </TouchableOpacity>
            </View>
            </View>

        </Modal>
      </View>
      )
    }

    async hide(source: DocumentSource){
      this.setState({source:source})
      try {
        console.log('SelectSource:' + source);
        this.props.onHide();
    } catch (e) {
      ErrorHandlingUtils.exception("onSelectSource",e);
    }
  }
       
}
  