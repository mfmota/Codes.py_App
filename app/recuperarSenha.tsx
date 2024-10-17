import React from 'react';
import {Text,View,TextInput,ImageBackground,SafeAreaView, Pressable} from 'react-native';
import { Image } from 'expo-image';
import{styles} from "./styles";
import { useGlobalFonts } from './styles';
import {useState} from "react";
import { useRouter } from 'expo-router';
import{auth} from '../utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Logo from 'assets/images/logoDIRPPG.png';
import Fundo from 'assets/images/fundo.png';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { Background } from '~/components/Background';

export default function recuperarSenha(){

    const fontsLoaded = useGlobalFonts();

    const [email, setEmail] = useState('');
    const router = useRouter();



    function redefinirSenha(){
        if(email !== ''){
            sendPasswordResetEmail(auth,email)
            .then(()=>{
                alert('Email enviado, confira sua caixa de entrada');
                router.replace('/');   
            })

            .catch((error) =>{
                const errorMessage= error.message;
                alert('Erro: '+errorMessage+' Tente Novamente');
                return;
            }) 
        }
        else{
            alert('informe o email');
        }
      
    }

    if (!fontsLoaded) {
        return null; // ou qualquer componente de carregamento
      }

    return(
        <SafeAreaView>
            <Background>

                <Container>

                    <View style={styles.boxTop}>
            
                        <Text style={styles.title} >DIRPPG-CT</Text>  
                        <Text style={styles.subTitle}>Diretoria de Pesquisa e Pós-Graduação</Text>             
            
                    </View>
                    

                    <View style={styles.boxMiddle}>

                        <Text style={styles.txt1}>Esqueceu a senha?</Text>
                        <Text style={styles.txt2}>Informe seu email cadastrado para continuar</Text>
                        <View style={styles.inputView}>
                            <MaterialIcons style={styles.iconInput}name="email" size={18} color="black" />
                            <TextInput style={styles.input} 
                                placeholder="| Email"
                                keyboardType='email-address'
                                autoComplete='email'
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        
                        <Button
                            title='Enviar'
                            onPress={redefinirSenha}
                            style={{width:'35%'}}
                        />

                        <Pressable onPress={()=>router.push('/')}>
                        <Text style={[styles.txtResposta,{alignSelf:'center',marginTop:'5%'}]} >Voltar</Text>
                        </Pressable>  
                    </View>
                    
                    <View style={styles.boxBottom}>
                            
                        <Image source={Logo} style={styles.logo}></Image>
                    </View>
                </Container>       
                        
            </Background>
        </SafeAreaView>

    );


}