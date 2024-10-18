import React from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
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