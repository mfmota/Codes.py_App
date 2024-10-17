import React from 'react';
import {Text,View,ImageBackground,SafeAreaView, Pressable, Linking,Platform} from 'react-native'
import { Image } from 'expo-image'
import{styles,useGlobalFonts} from "../styles"
import Fundo from '../../assets/images/fundo.png'
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import Logo from '../../assets/images/logoDIRPPG.png';
import {Header} from '../../components/header/header';
import { Background } from '~/components/Background';
import { Container } from '~/components/Container';
export default function prazos (){ 
    const fontsLoaded = useGlobalFonts();

    const openEmail = () =>{
        Linking.openURL("mailto: dirppgapp@gmail.com");
    }

    const makePhoneCall = () =>{
        if(Platform.OS === "android")
            Linking.openURL("tel: 41 33104676");
        else
        Linking.openURL("telprompt: 41 33104676");
    }


    const openMaps = () => {
        const address = "Av. Sete de Setembro, 3.165, Curitiba, PR";
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.openURL(url);
    }

    if (!fontsLoaded) {
        return null; 
      }

    return(

        <SafeAreaView>
            <Background>
                <Header/>
                <Container>

                   <View style={styles.boxTopCadastro}>
                        <Text style={[styles.title]}>Contato</Text>
                    </View>    

                    <View style={styles.boxDuvidas} >

                        <View style={styles.boxInfoDuvidas}>
                            <Pressable style={{marginRight:20}}
                                onPress={openEmail}>
                                <MaterialIcons name="email" size={24} color="black" />
                            </Pressable>
                    
                            <Text style={styles.txtContato}>dirppg-ct@utfpr.edu.br </Text>
                                
                        </View>
                            
                        <View style={styles.boxInfoDuvidas}>
                            <Pressable style={{marginRight:20}}
                                onPress={makePhoneCall}>
                                <Foundation name="telephone" size={24} color="black" />
                            </Pressable>
                            <Text style={styles.txtContato}>(41) 3310-4545 </Text>
                        </View>
                            
                        <View style={styles.boxInfoDuvidas}>
                           <Pressable style={{marginRight:20}}  onPress={openMaps}>
                                <MaterialIcons name="place" size={24} color="black" />
                            </Pressable>  
                        
                            <Text style={[styles.txtContato,{width:'80%'}]}>
                                Av. Sete de Setembro, 3.165 – Curitiba PR. Sala: CJ – 007
                                Andar térreo.</Text>
                        </View>
                           
                    </View>

                </Container>
            </Background>
        </SafeAreaView>


    );

}