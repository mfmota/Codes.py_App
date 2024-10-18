import React, {useState} from 'react';
import {Text,View,TextInput,SafeAreaView, Pressable} from 'react-native';
import{styles,useGlobalFonts } from "./styles";
import { useRouter } from 'expo-router';
import{auth} from '../utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { Background } from '~/components/Background';
import { Footer } from '~/components/footer/footer';
import { InputView } from '~/components/InputView';
import TXTOptions from '~/components/TXTOption';

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
        return null; 
      }

    return(
        <SafeAreaView>
            <Background>
                <Container>
                    <View style={[styles.boxTop,{height:hp(20)}]}>
                        <Text style={styles.title} >DIRPPG-CT</Text>  
                        <Text style={styles.subTitle}>Diretoria de Pesquisa e Pós-Graduação</Text>             
                    </View>
                    

                    <View style={styles.boxMiddle}>

                        <Text style={styles.txt1}>Esqueceu a senha?</Text>
                        <Text style={styles.txt2}>Informe seu email cadastrado para continuar</Text>
                        <InputView>
                            <MaterialIcons style={styles.iconInput}name="email" size={18} color="black" />
                            <TextInput style={styles.input} 
                            placeholder="| Email"
                            keyboardType='email-address'
                            autoComplete='email'
                            value={email}
                            onChangeText={setEmail}
                            />
                        </InputView>
                        
                        <Button
                        title='Enviar'
                        onPress={redefinirSenha}
                        style={{width:'35%'}}
                        />
                        <TXTOptions
                        title1=''
                        title2='Voltar'
                        style={{alignSelf:'center',paddingRight:'18%'}}
                        onPress={()=>router.push('/')}
                        />
                    </View>
                    <Footer
                        style={{marginTop:'18%'}}/>
                </Container>                  
            </Background>
        </SafeAreaView>

    );


}