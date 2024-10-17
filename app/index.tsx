import React from 'react';
import {useState} from "react"
import {Text,View,TextInput,ImageBackground,SafeAreaView, Pressable} from 'react-native'
import{styles} from "./styles"
import { useGlobalFonts } from './styles';
import{auth} from '../utils/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import {useRouter} from 'expo-router'
import Logo from 'assets/images/logoDIRPPG.png'
import Fundo from 'assets/images/fundo.png'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Image } from 'expo-image';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { Background } from '~/components/Background';
import { InputView } from '~/components/InputView';

export default function Login(){

    const fontsLoaded = useGlobalFonts();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router= useRouter();

    function userLogin(){
        signInWithEmailAndPassword(auth,email,senha)
        .then((userCredential) =>{
            const user = userCredential.user;
            router.replace('../(tabs)/calendario');
        })
        .catch((error) =>{
            const errorCode = error.code;
            const errorMessage= error.message;
            alert(errorMessage);
        })
            
        }

    function novoUsuario(){
        router.replace('/cadastro');
    }    

    function redefinirSenha(){
        router.replace('/recuperarSenha');
    }

    if (!fontsLoaded) {
        return null; 
      }
    
    return(
        <SafeAreaView>
            <Background>
                
                <Container>

                    <View style={styles.boxTopLogin}>
        
                        <Text style={styles.title} >DIRPPG-CT</Text>  
                        <Text style={styles.subTitle}>Diretoria de Pesquisa e Pós-Graduação</Text>             
                        
                    </View>

                    <View style={styles.boxMiddleLogin}>

                        <Text style={styles.txtLogin}>Login</Text> 
                        
                        <InputView >
                            <MaterialIcons style={styles.iconInput}name="email" size={18} color="black" />
                            <TextInput 
                            style={styles.input}
                            placeholder=" | Email"
                            keyboardType='email-address'
                            autoComplete='email'
                            value={email}
                            onChangeText={setEmail}
                            />
                        </InputView>
                        

                        <InputView>
                            <Fontisto style={styles.iconInput}name="locked" size={16} color="black" />
                            <TextInput style={styles.input}  
                                placeholder=" | Senha"
                                autoCapitalize='none'
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                            />
                        </InputView>
                        <Pressable onPress={redefinirSenha}>
                            <Text style={styles.txtSenha}>Esqueci minha senha</Text>
                        </Pressable>   
                        
                    </View>

                    <View style={styles.boxBottomLogin}>
                    
                    <Button
                        title='Entrar'
                        onPress={userLogin}
                    />
                            
                            <Pressable onPress={novoUsuario} style={{flexDirection:'row'}}>
                                <Text style={styles.txtPergunta}>Não tem uma conta? </Text>
                                <Text style={styles.txtResposta}> Cadastre-se</Text>
                            </Pressable>   
                    </View>

                    <View style={styles.boxLogo}>
                        <Image source={Logo} style={styles.logo}></Image>
                    </View>
                    
                </Container>   
            </Background>
        </SafeAreaView>
        
    );

}