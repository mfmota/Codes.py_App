import React,{useState,useEffect} from 'react';
import {Text,View,TextInput,ImageBackground,SafeAreaView, Pressable,TouchableOpacity,FlatList} from 'react-native';
import {WebView} from 'react-native-webview';
import{styles} from "../styles";
import Fundo from '../../assets/images/fundo.png';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Image } from 'expo-image';
import Logo from '../../assets/images/logoDIRPPG.png';
import {Header} from '../../components/header/header';
import { Background } from '~/components/Background';
import { Container } from '~/components/Container';

export default function site(){

    return(

        <SafeAreaView>
            <Background>
                <Header/>
                <Container>
                    <WebView
                    source={{uri:'https://www.utfpr.edu.br/documentos/pesquisa-e-pos-graduacao/dirppg-ct'}}
                    />    
                </Container>  
            </Background>
        </SafeAreaView>



    );

}