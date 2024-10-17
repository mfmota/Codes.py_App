import { Dimensions, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

SplashScreen.preventAutoHideAsync();

export function useGlobalFonts() {
    const [fontsLoaded, error] = useFonts({
      'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
      'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    });


    const {height,width}=Dimensions.get('window')
  
    useEffect(() => {
      async function prepare() {
        if (error) {
          console.error('Erro ao carregar fontes', error);
          await SplashScreen.hideAsync();
        } else if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }
      prepare();
    }, [fontsLoaded, error]);
  
    return fontsLoaded;
  }

export const styles = StyleSheet.create({

//-------------------------Containers-------------------------

    
    boxTop:{
        justifyContent:'center',
        flex:2,
        width:'100%',
       
    },

    boxMiddle:{
        flex:4,
        padding:'5%',
        justifyContent:'flex-start',
        width: '100%',
    },

    boxBottom:{
        flex:1, 
        width: '100%',
        paddingHorizontal:30,
        marginTop:'5%',
        position:'relative',
    },

    containerTabs:{
        height:'90%',
        marginTop:'5%',
        marginHorizontal:'5%',
        borderRadius:20,
        backgroundColor:'white',
    },


    //---------------------------------Geral------------------------------

    title:{
        fontSize:40,
        alignSelf:'center',
        paddingBottom:5,
        fontFamily: 'Montserrat-ExtraBold'
    }, 

    subTitle:{
        alignSelf:'center',
        fontSize:12,
        fontFamily: 'Montserrat-SemiBold'
    },

    input:{
        marginLeft:'2%'
    },

    inputView:{
        flexDirection: 'row',
        height: '10%',
        width:'80%',
        marginBottom: 12,
        borderRadius:40,
        backgroundColor:'#e8ebfa',  
        paddingBottom:'2%',
        paddingTop:'1%',
        alignSelf:'center'
    },

    iconInput:{
        alignSelf:'center',
        marginLeft:'6%'
    },

   
    //--------------------------------Nucleo--------------------------------------

    label:{
        width:'80%',
        color:'#ddd',
        alignSelf:'center'
    },

    box:{
        width:'80%',
        backgroundColor:'#e8ebfa',
        alignSelf:'center',
        borderRadius:40,
        borderWidth:0,
        maxHeight:hp(5),
        overflow:'scroll'},

    drop:{
        overflow:'scroll',
        width:'80%',
        alignSelf:'center',
        borderRadius:40,
        top:'70%',
        backgroundColor:'#e8ebfa',
        zIndex:999,
        position: 'absolute',
        fontFamily:'Montserrat-Regular'},

//--------------------------------Index-----------------------------------

    boxTopLogin:{
        justifyContent:'center',
        height:hp(20),
        width:'100%',
    },

    boxMiddleLogin:{
        height:hp(25),
        padding:'5%',
        justifyContent:'flex-start',
        width: '100%',
    },

    boxBottomLogin:{
        height:hp(20) ,
        width: '100%',
        paddingHorizontal:30,
        position:'relative',
    },

    boxLogo:{
        height:hp(20) ,
        width: '100%',
        position:'relative',
    },

    logo:{
        width:'55%',
        height:'55%',
        resizeMode:'contain',
        alignSelf:'center',
        marginTop:'5%'
    },

    txtLogin:{
        fontSize:20,
        marginBottom:'10%',
        alignSelf:'center',
         fontFamily: 'Montserrat-ExtraBold'
     },
 
     txtSenha:{
         fontSize:10,
         textDecorationLine:'underline',
         alignSelf:'flex-end',
         marginRight:'12%',
         paddingBottom:'5%',
         fontFamily:'Montserrat-ExtraBold'
     },
 
     txtPergunta:{
         fontSize:10,
         justifyContent:'flex-start',
         marginLeft:'20%',
         fontFamily:'Montserrat-Regular'
     },
 
     txtResposta:{
         fontSize:10,
        justifyContent:'flex-end',
        textDecorationLine:'underline',
        fontFamily:'Montserrat-ExtraBold'
     },



//-------------------------------Cadastro------------------------------------------

    boxTopCadastro:{
        justifyContent:'center',
        height:hp(10),
        width:'100%',
        paddingTop:'5%'
    },

    boxMiddleCadastro:{
        height:hp(40),
        paddingHorizontal:'5%',
        paddingTop:'10%',
        justifyContent:'flex-start',
        width: '100%',
        overflow:'scroll'
    },

    boxBottomCadastro:{
        height:hp(15) ,
        width: '100%',
        paddingHorizontal:30,
        position:'relative',
    },

    boxLogoCadastro:{
        height:hp(20) ,
        width: '100%',
        position:'relative',
    },

    cadastro:{
        fontSize:20,
        alignSelf: 'center',
        fontFamily: 'Montserrat-ExtraBold'
     },

    
 //---------------------------------Redef Senha--------------------------------------------------------

     txt1:{
        fontFamily:'Montserrat-ExtraBold',
        fontSize:18,
        alignSelf:'center',
        marginBottom:'2%',
        marginTop:'15%'
     },

     txt2:{
        fontFamily:'Montserrat-Regular',
        fontSize:10,
        marginBottom:'5%',
        alignSelf:'center',
     },

//----------------------------------------CONTATO----------------------------------------------------

    boxDuvidas:{
        height:'70%', 
        padding: 20,
        marginVertical: 20,
        alignItems: 'flex-start', 
        width: '80%'
    },

    boxInfoDuvidas:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:35
    },

    txtContato:{
        fontFamily:'Montserrat-SemiBold'
        
    },   

//--------------------------------------AGENDA-----------------------------------------------------------------

    buscaContainer: {
        flexDirection: 'row',  
        marginTop:'3%',
        marginLeft:'10%',
        overflow:'hidden'
    },

    
    filterButton: {
        borderRadius: 5,
        backgroundColor:'#e8ebfa',
        padding:2,
        alignSelf:'center'
    },

    inputViewAgenda:{
        flexDirection:'row',
        justifyContent:'space-between',
        height: '60%',
        width:'75%',
        borderRadius:20,
        backgroundColor:'#e8ebfa',  
        marginLeft:'5%',
        paddingBottom:'2%',
        marginTop:'3%'
    },

    inputAgenda:{
       marginTop:'3%',
       marginLeft:'4%',
    },

    iconAgenda:{
        marginRight:'5%',
        marginTop:'2%'
    },


    dropdown: {
        backgroundColor: '#fff',
        alignSelf:'flex-start',
        borderRadius: 5,
        position:'absolute',
        top:'80%',
        left:'5%',
        zIndex:999
    },

    filterText: {
        fontFamily:'Montserrat-Regular',
         fontSize: 12,
     },
     
     dropdownItem: {
         padding: 10,
         borderBottomWidth: 1,
         borderBottomColor: '#ddd',
     },

     
    txtData:{
        fontFamily:'Montserrat-SemiBold',
        fontSize:10,
    },

    txtEvento:{
        fontFamily:'Montserrat-Bold',
        fontSize:12,
    },

    item: {
        padding:10,
        marginBottom:10,
        width:'90%',
        alignSelf:'center',
        alignContent:'center',
        borderRadius:10,
        borderColor:'#ddd',
        borderBottomWidth:2
    },

    list:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },
   
    txtDetalhes:{
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'space-between',
        color:'black',
        paddingTop:'5%'
        
    },

//--------------------------------------PRAZOS------------------------------------------------------- 

    iconContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,  
    width: 22,         
    height: 22,
    overflow: 'hidden',
    marginLeft: 'auto', 
    },

    prazosTitle:{
        fontFamily:'Montserrat-ExtraBold',
        alignSelf:'center',
        textAlign:'center',
        width:'80%',
        fontSize:22,
    },



//--------------------------------PERFIL--------------------------------

inputViewPerfil:{
    flexDirection: 'row',
    height: hp(5),
    width:'80%',
    marginBottom:'5%',
    borderRadius:40,
    backgroundColor:'#e8ebfa',  
    paddingBottom:'2%',
    paddingTop:'1%',
    alignSelf:'center'
    
},
})