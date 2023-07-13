import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
    appTitleContainer: {
      backgroundColor: 'green',
    },
    appTitle: {
      color: 'white',
      fontSize: 20,
      margin: 12,
  },
    rowContainer: {
      padding:15,
      flexDirection: 'row'
    },
    textContainer: {
      paddingLeft: 15,
      flexShrink: 1
  },
    buttonContainer: {
      borderWidth: 0,
      borderBottomWidth:1,
    },
      buttonIcon: {
        alignSelf: 'center',
      },
        buttonText:{
//          alignSelf: 'center',
        },
        buttonHeaderText:{
          fontSize: 18,       
          fontWeight: 'bold',
        },
        modalView: {
          backgroundColor:"#000000aa",
          flex:1,
          justifyContent: "center", 
          },
        modalContent: {
          backgroundColor: "white",
          margin:20,
          padding:20,
          borderRadius:8,
        },
        modalTitleText: {
          fontSize:20
        },
        modalButton:{
          marginVertical:15,
        },
        modalButtonText:{
          fontSize:15,
        },
    });
 
