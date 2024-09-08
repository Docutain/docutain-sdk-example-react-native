/** 
*   Docutain SDK React Native
*   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
*
*   Docutain SDK React Native is a commercial product and requires a license. 
*   Details found in the LICENSE file in the root directory of this source tree.
*/

import DocutainSDK from '@docutain/react-native-docutain-sdk';
import { Alert } from 'react-native';
import RNFS from 'react-native-fs';

export class ErrorHandlingUtils {
  public static exception(functionName: string, ex:any) {
    const text: string = functionName +" exception: " + JSON.stringify(ex);
    console.error(text);
    // @ts-ignore
    // eslint-disable-next-line no-alert
    alert(text);
  }

  public static async DocutainError(functionName: string)  {
    // get the latest error message
    const text: string = "DOCUTAIN Error\n\n" + functionName +" failed: " + await DocutainSDK.getLastError();
    console.error(text);
    // copy trace if needed
    const traceFile:string = await DocutainSDK.getTraceFile();
    console.log("TraceFile: " + traceFile);
    // @ts-ignore
    // eslint-disable-next-line no-alert
    alert(text);
    try{
      console.log("copyFile to" + RNFS.DownloadDirectoryPath+"/Docutain.txt");
      await RNFS.copyFile(traceFile,RNFS.DownloadDirectoryPath+"/Docutain.txt");
    }
    catch(ex)
    {
      console.log("copyFile exeption: " + ex);
      alert(ex);
    }
    return false;
  }
  
}
  