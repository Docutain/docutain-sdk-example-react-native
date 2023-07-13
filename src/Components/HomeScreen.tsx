import React from "react";
import {styles} from  './Styles'
import { ScrollView, Alert, Text, View, Image, TouchableOpacity, PermissionsAndroid} from 'react-native';
import DocutainSDK, { DocumentScannerConfiguration} from '@docutain/react-native-docutain-sdk';
import {SelectSourceModal} from  './SelectSourceModal'
import {DocumentSource, SampleMenue} from './model'
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker'
import Spinner from 'react-native-loading-spinner-overlay'
import {ErrorHandlingUtils} from './ErrorHandlingUtils';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer'

interface HomescreenProps {
  navigation:any,
}

interface HomescreenStates {
  selectSourceShow: boolean,
  menueItem: SampleMenue,
  showWait: boolean
}

export class HomeScreen extends React.Component  <HomescreenProps, HomescreenStates>{
    constructor(props: any) {
        super(props);
        this.state = {
          selectSourceShow: false,
          menueItem: SampleMenue.DataExtraction,
          showWait: false
        }
      }
         
    render() {
      return (
        <View style={{flex:1}}>
		      <Spinner size="large" visible= {this.state.showWait}/> 
          <SelectSourceModal show={this.state.selectSourceShow} onSelectSource={(source:DocumentSource) => this.onSourceSelected(source)}></SelectSourceModal>
          <ScrollView>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.onScanPageLocal()}>
          <View style= {styles.rowContainer}>
          <Image style= {styles.buttonIcon} source={require('../assets/document_scanner.png')}></Image>
          <View style= {styles.textContainer} >
          <Text style={styles.buttonHeaderText}>Document Scanner</Text>
          <Text style={styles.buttonText}>Starts the document scanner which provides automatic scanning of paper documents.</Text>
          </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.onSelectPage(SampleMenue.DataExtraction)}>
            <View style= {styles.rowContainer}>
          <Image style= {styles.buttonIcon} source={require('../assets/data_extraction.png')}></Image>
          <View style= {styles.textContainer} >
          <Text style={styles.buttonHeaderText}>Data Extraction</Text>
          <Text style={styles.buttonText}>Extract data, e.g. invoice data, from a previously scanned or imported (PDF or Image) document.</Text>
          </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.onSelectPage(SampleMenue.ReadOCR)}>
            <View style= {styles.rowContainer}>
          <Image style= {styles.buttonIcon} source={require('../assets/ocr.png')}></Image>
          <View style= {styles.textContainer} >
          <Text style={styles.buttonHeaderText}>Text Recognition (OCR)</Text>
          <Text style={styles.buttonText}>Run OCR on the previously scanned or imported (PDF or Image) document and get the recognized text.</Text>
          </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.onSelectPage(SampleMenue.WritePDF)}>
            <View style= {styles.rowContainer}>
          <Image style= {styles.buttonIcon} source={require('../assets/pdf.png')}></Image>
          <View style= {styles.textContainer} >
          <Text style={styles.buttonHeaderText}>Generate PDF Document</Text>
          <Text style={styles.buttonText}>Generate a searchable (includes recognized text) PDF document out of the scanned pages or imported image.</Text>
          </View>
          </View>
          </TouchableOpacity>
          </ScrollView>
      </View>
     );
  };

async  onScanPageLocal() {
    //see [https://docs.docutain.com/docs/react-native/docScan] for more information
    try {
      console.log('vor ScanPage Local');

      //define a DocumentScannerConfiguration to alter the scan process  
      const options: DocumentScannerConfiguration = {
        allowCaptureModeSetting: true, //defaults to false
        pageEditConfig: {
          allowPageFilter: false,  //defaults to true
          allowPageRotation: true  //defaults to true
        },

        //detailed information about theming possibilities can be found here [https://docs.docutain.com/docs/react-native/theming]
        ColorConfig: {
          ColorTopBarBackground: {Light:"#0000ff", Dark:"#6495ED"},
          ColorBottomBarBackground: {Light:"#0000ff", Dark:"#6495ED"}
        }
      }
      
      //start the scanner
      const rc = await DocutainSDK.scanDocument(options);        
      console.log('scanDocument rc:' + rc);

      } catch (e) {
        ErrorHandlingUtils.exception("onScanPageLocal",e);
      }
  };

  async onSelectPage(menueItem: SampleMenue){
      console.log('SelectPage');
      this.setState({selectSourceShow:true}); 
      this.setState({menueItem:menueItem}); 
  };


  async onSourceSelected(source: DocumentSource){
    try {
        this.setState({selectSourceShow:false}); 

        // Depending on the selected source, start the scanner or use the file picker to select a file to load
        console.log('onSourceSelected:' + source);
        if(source == DocumentSource.Dokumentenscanner)
        {
            //see [https://docs.docutain.com/docs/react-native/docScan] for more information
            //define a DocumentScannerConfiguration to alter the scan process  
            const options: DocumentScannerConfiguration = {
            allowCaptureModeSetting: true,
            pageEditConfig: {allowPageFilter: true, allowPageRotation: true}
          }
          console.log('HomeScreen onSourceSelected vor scanDocument');
          //start the scanner
          const rc = await DocutainSDK.scanDocument(options);
          console.log('HomeScreen onSourceSelected nach scanDocument. rc:' + rc);
          if(!rc) ErrorHandlingUtils.DocutainError("writePDF");
          }
        else
        {
          //load a file
          const rc = await this.pickFileLoad(source);
          if(!rc)
            return;
        }
        switch(this.state.menueItem)
        {
          case SampleMenue.DataExtraction:
            // analyze the document and show the result 
            this.props.navigation.push("AnalyzeResult");
            break;
          case SampleMenue.ReadOCR:
            // read OCR and show the result 
            this.props.navigation.push("TextResult");
            break;
          case SampleMenue.WritePDF:
            //  
            const rc = await this.requestExternalStoragePermission()
            if(!rc)
              return
            //define the output file for the PDF
            const filePath = RNFS.DownloadDirectoryPath + "/Sample.PDF";
            console.log('WritePDF filePath:' + filePath);
            //generate the PDF from the currently loaded document
            //the generated PDF also contains the detected text, making the PDF searchable
            //see [https://docs.docutain.com/docs/react-native/pdfCreation] for more details
            const resultFilePath: string = await DocutainSDK.writePDF(filePath, true, "A4");
            if(!resultFilePath || resultFilePath.length == 0){
              ErrorHandlingUtils.DocutainError("writePDF");
            }
            else{
              //open the PDF for demonstration purposes
              FileViewer.open(resultFilePath).catch((err) => {
                console.log(err)
              });
            }
            break;
        }
      } catch (e) {
          ErrorHandlingUtils.exception("onSourceSelected",e);
      }
  };

  async pickFileLoad(source: DocumentSource) : Promise<boolean>
  {
    console.log('DocumentPicker ' + source)
    var rc = false
    // Select a PDF file or an image depending on the selected data source
    try {
      const res: DocumentPickerResponse = await DocumentPicker.pickSingle({
      // @ts-ignore
      type: [(source == DocumentSource.ImageImport) ? DocumentPicker.types.images : DocumentPicker.types.pdf],
    })
    console.log('DocumentPicker Response:' + res)
    this.setState({showWait:true})
    // Import a PDF or image 
    //see [https://docs.docutain.com/docs/react-native/fileImport] for more details
    rc = await DocutainSDK.loadFile(res.uri)
    console.log('PDFImport Response:' + rc)
    this.setState({showWait:false})
    if(!rc){
      if(!rc) ErrorHandlingUtils.DocutainError("writePDF");
    }

  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      return false
    } else {
      console.error(err)
    }
  }
  this.setState({showWait:false})
  return rc;
};

async requestExternalStoragePermission()
{
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
      ErrorHandlingUtils.exception("requestExternalStoragePermission",e);
    }
    return false;
  };
}