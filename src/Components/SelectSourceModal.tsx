/**
 *   Docutain SDK React Native
 *   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
 *
 *   Docutain SDK React Native is a commercial product and requires a license.
 *   Details found in the LICENSE file in the root directory of this source tree.
 */

import React, {useCallback} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './Styles';
import {DocumentSource} from './model';
import {ErrorHandlingUtils} from './ErrorHandlingUtils';

interface SelectSourceModalProps {
  show: boolean;
  onSelectSource: any;
  onHide: any;
}

interface SelectSourceModalStates {
  source: DocumentSource;
}

export class SelectSourceModal extends React.Component<
  SelectSourceModalProps,
  SelectSourceModalStates
> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View>
        <Modal
          transparent={true}
          visible={this.props.show}
          animationType="slide">
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitleText}>
                First, scan or import a document
              </Text>
              <TouchableOpacity
                testID="scan-document-camera"
                accessibilityLabel="scan-document-camera"
                style={styles.modalButton}
                onPress={() =>
                  this.hide(DocumentSource.DokumentenscannerCamera)
                }>
                <Text style={styles.modalButtonText}>Document scan camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="scan-document-gallery"
                accessibilityLabel="scan-document-gallery"
                style={styles.modalButton}
                onPress={() =>
                  this.hide(DocumentSource.DokumentenscannerGallery)
                }>
                <Text style={styles.modalButtonText}>
                  Document scan gallery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="pdf-import"
                accessibilityLabel="pdf-import"
                style={styles.modalButton}
                onPress={() => this.hide(DocumentSource.PDFImport)}>
                <Text style={styles.modalButtonText}>PDF Import</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="image-import"
                accessibilityLabel="image-import"
                style={styles.modalButton}
                onPress={() => this.hide(DocumentSource.ImageImport)}>
                <Text style={styles.modalButtonText}>Image Import</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  async hide(source: DocumentSource) {
    this.setState({source: source});
    try {
      console.log('SelectSource:' + source);
      this.props.show = false;
      this.setState({show: false});
      this.props.onSelectSource(source);
    } catch (e) {
      ErrorHandlingUtils.exception('onSelectSource', e);
    }
  }
}
