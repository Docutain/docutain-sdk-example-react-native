/**
 *   Docutain SDK React Native
 *   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
 *
 *   Docutain SDK React Native is a commercial product and requires a license.
 *   Details found in the LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {styles} from './Styles';
import {ScrollView, Text, View, Image, TouchableOpacity, PermissionsAndroid} from 'react-native';
import DocutainSDK, { DocumentScannerConfiguration} from '@docutain/react-native-docutain-sdk';
import {SelectSourceModal} from './SelectSourceModal';
import {DocumentSource, SampleMenue} from './model';
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {ErrorHandlingUtils} from './ErrorHandlingUtils';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {Settings} from './Settings';

interface HomescreenProps {
  navigation: any;
}

interface HomescreenStates {
  selectSourceShow: boolean;
  menueItem: SampleMenue;
  showWait: boolean;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export class HomeScreen extends React.Component<
  HomescreenProps,
  HomescreenStates
> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectSourceShow: false,
      menueItem: SampleMenue.DataExtraction,
      showWait: false,
    };
  }

  Settings = new Settings();

  render() {
    return (
      <View style={{flex: 1}}>
        <Spinner size="large" visible={this.state.showWait} />
        <SelectSourceModal
          show={this.state.selectSourceShow}
          onHide={() => this.setState({selectSourceShow: false})}
          onSelectSource={(source: DocumentSource) =>
            this.onSourceSelected(source)
          }></SelectSourceModal>
        <ScrollView>
          <TouchableOpacity testID='document-scanner'
            style={styles.buttonContainer}
            onPress={() => this.onScanPageLocal()}>
            <View style={styles.rowContainer}>
              <Image
                style={styles.buttonIcon}
                source={require('../assets/document_scanner.png')}></Image>
              <View style={styles.textContainer}>
                <Text style={styles.buttonHeaderText}>Document Scanner</Text>
                <Text style={styles.buttonText}>
                  Starts the document scanner which provides automatic scanning
                  of paper documents.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity testID='data-extraction'
            style={styles.buttonContainer}
            onPress={() => this.onSelectPage(SampleMenue.DataExtraction)}>
            <View style={styles.rowContainer}>
              <Image
                style={styles.buttonIcon}
                source={require('../assets/data_extraction.png')}></Image>
              <View style={styles.textContainer}>
                <Text style={styles.buttonHeaderText}>Data Extraction</Text>
                <Text style={styles.buttonText}>
                  Extract data, e.g. invoice data, from a previously scanned or
                  imported (PDF or Image) document.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity testID='text-recognition'
            style={styles.buttonContainer}
            onPress={() => this.onSelectPage(SampleMenue.ReadOCR)}>
            <View style={styles.rowContainer}>
              <Image
                style={styles.buttonIcon}
                source={require('../assets/ocr.png')}></Image>
              <View style={styles.textContainer}>
                <Text style={styles.buttonHeaderText}>Text Recognition</Text>
                <Text style={styles.buttonText}>
                  Run OCR on the previously scanned or imported (PDF or Image)
                  document and get the recognized text.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity testID='generate-pdf-document'
            style={styles.buttonContainer}
            onPress={() => this.onSelectPage(SampleMenue.WritePDF)}>
            <View style={styles.rowContainer}>
              <Image
                style={styles.buttonIcon}
                source={require('../assets/pdf.png')}></Image>
              <View style={styles.textContainer}>
                <Text style={styles.buttonHeaderText}>
                  Generate PDF Document
                </Text>
                <Text style={styles.buttonText}>
                  Generate a searchable (includes recognized text) PDF document
                  out of the scanned pages or imported image.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity testID='settings'
            style={styles.buttonContainer}
            onPress={() => this.openSettings()}>
            <View style={styles.rowContainer}>
              <Image
                style={styles.buttonIcon}
                source={require('../assets/settings.png')}></Image>
              <View style={styles.textContainer}>
                <Text style={styles.buttonHeaderText}>Settings</Text>
                <Text style={styles.buttonText}>
                  Configure color, scanner and editing of the SDK
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  async onScanPageLocal() {
    //see [https://docs.docutain.com/docs/react-native/docScan] for more information
    try {
      console.log('vor ScanPage Local');

      //In this sample app we provide a settings page which the user can use to alter the scan settings
      //The settings are stored in and read from AsyncStorage
      //This is supposed to be just an example, you do not need to implement it in that exact way
      //If you do not want to provide your users the possibility to alter the settings themselves at all
      //You can just set the settings according to the apps needs
      const options: DocumentScannerConfiguration = await this.Settings.getScannerConfiguration();
      console.log('options : ' + JSON.stringify(options));
      //start the scanner
      const rc = await DocutainSDK.scanDocument(options);
      console.log('scanDocument rc:' + rc);
    } catch (e) {
      ErrorHandlingUtils.exception('onScanPageLocal', e);
    }
  }

  async onSelectPage(menueItem: SampleMenue) {
    console.log('onSelectPage: ' + menueItem);
    this.setState({selectSourceShow: true});
    this.setState({menueItem: menueItem});
  }

  async openSettings() {
    this.props.navigation.push('Settings');
  }

  async closeSelectSource() {
    this.setState({selectSourceShow: false}, () => {
      console.log('closeSelectSource: ' + this.state.selectSourceShow);
    });
    await sleep(1000);
  }

  async onSourceSelected(source: DocumentSource) {
    try {
      // Depending on the selected source, start the scanner or use the gallery to select a files to load
      console.log('onSourceSelected:' + source);
      await this.closeSelectSource();
      if ( source == DocumentSource.DokumentenscannerCamera || source == DocumentSource.DokumentenscannerGallery) {
       
        //In this sample app we provide a settings page which the user can use to alter the scan settings
        //The settings are stored in and read from AsyncStorage
        //This is supposed to be just an example, you do not need to implement it in that exact way
        //If you do not want to provide your users the possibility to alter the settings themselves at all
        //You can just set the settings according to the apps needs
        const options: DocumentScannerConfiguration = await this.Settings.getScannerConfiguration();
        console.log('HomeScreen onSourceSelected vor scanDocument');

        //start the scanner using files for the gallery
        if (source == DocumentSource.DokumentenscannerGallery) {
          options.source = 'GALLERY';
        }

        //start the scanner using the provided config
        const rc = await DocutainSDK.scanDocument(options);
        console.log('HomeScreen onSourceSelected nach scanDocument. rc:' + rc);
        if (!rc) return;
      } else {
        //load a file
        const rc = await this.pickFileLoad(source);
        if (!rc) return;
      }
      switch (this.state.menueItem) {
        case SampleMenue.DataExtraction:
          // analyze the document and show the result
          this.props.navigation.push('AnalyzeResult');
          break;
        case SampleMenue.ReadOCR:
          // read OCR and show the result
          this.props.navigation.push('TextResult');
          break;
        case SampleMenue.WritePDF:
          //define the output file for the PDF
          const filePath = RNFS.DocumentDirectoryPath + '/Sample.PDF';
          console.log('WritePDF filePath:' + filePath);
          //generate the PDF from the currently loaded document
          //the generated PDF also contains the detected text, making the PDF searchable
          //see [https://docs.docutain.com/docs/react-native/pdfCreation] for more details
          const resultFilePath: string = await DocutainSDK.writePDF(
            filePath,
            true,
            'A4',
          );
          if (!resultFilePath || resultFilePath.length == 0) {
            ErrorHandlingUtils.DocutainError('writePDF');
          } else {
            //open the PDF for demonstration purposes
            FileViewer.open(resultFilePath, { showOpenWithDialog: true }).catch(err => {
              console.log('FileViewer File:'+resultFilePath +' Error:'+ err);
            });
          }
          break;
      }
    } catch (e) {
      ErrorHandlingUtils.exception('onSourceSelected', e);
    }
  }

  async pickFileLoad(source: DocumentSource): Promise<boolean> {
    console.log('DocumentPicker ' + source);
    var rc = false;
    // Select a PDF file or an image depending on the selected data source
    try {
      const res: DocumentPickerResponse = await DocumentPicker.pickSingle({
        // @ts-ignore
        type: [
          source == DocumentSource.ImageImport
            ? DocumentPicker.types.images
            : DocumentPicker.types.pdf,
        ],
      });
      console.log('DocumentPicker Response:' + res);
      this.setState({showWait: true});
      // Import a PDF or image
      //see [https://docs.docutain.com/docs/react-native/fileImport] for more details
      rc = await DocutainSDK.loadFile(res.uri);
      console.log('loadFile Response:' + rc);
      this.setState({showWait: false});
      if (!rc) {
        if (!rc) ErrorHandlingUtils.DocutainError('loadFile');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        return false;
      } else {
        console.error(err);
      }
    }
    this.setState({showWait: false});
    return rc;
  }

  async requestExternalStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Docutain SDK Sample App Storage Permission',
          message:
            'Docutain SDK Sample needs access to your storage in order to save the PDF.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can write the PDF');
        return true;
      } else {
        console.log('Write permission denied');
      }
    } catch (e) {
      ErrorHandlingUtils.exception('requestExternalStoragePermission', e);
    }
    return false;
  }
}
