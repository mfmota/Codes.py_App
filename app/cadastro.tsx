import React ,{useState}  from 'react';
import {Text,View,TextInput,SafeAreaView, Pressable} from 'react-native';
import{styles, useGlobalFonts} from "./styles";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { router } from 'expo-router';
import{auth} from '../utils/firebase';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { Background } from '~/components/Background';
import { InputView } from '~/components/InputView';
import SelectNucleo from '~/components/SelectNucleo';
import { Footer } from '~/components/footer/footer';
import TXTOptions from '~/components/TXTOption';


export default function criarLogin(){

    const fontsLoaded = useGlobalFonts();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const[senhaConf, setSenhaConf] = useState('');

    const addBd = async () =>{
        if(nome === '' ||email === '' ||senha === '' || senhaConf ==''){
        alert('Preencha todos os campos');
        return;
        }

        if(senha !== senhaConf){
            alert('As senhas precisam ser iguais');
            return;
        }

        else{

            createUserWithEmailAndPassword(auth,email,senha)
            .then((UserCredencial) =>{
                const user = UserCredencial.user;    
                updateProfile(user, {
                    displayName:nome
                  })
                alert('Usuário Cadastrado');
                router.replace('/');
            })
            .catch((error) =>{
                const errorMessage = error.message;
                alert(errorMessage);
                router.replace('/');
            })

        }
    }

    if (!fontsLoaded) {
        return null; 
      }
    

    return(
        <SafeAreaView>
            <Background>
                <Container>          
                    <View style={[styles.boxTop,{height:hp(13),paddingTop:'5%'}]}>
                        <Text style={[styles.title,{fontSize:20}]}>Cadastro</Text> 
                    </View>

                    <View style={[styles.boxMiddle,{overflow:"visible",height:hp(35)}]}>
                   
                        <InputView>
                            <Ionicons style={styles.iconInput}name="person" size={18} color="black" />
                            <TextInput style={styles.input} 
                            placeholder="| Nome"
                            value={nome}
                            onChangeText={setNome}
                            />
                       </InputView>

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

                        <SelectNucleo/>
                            
                        <InputView>
                            <Fontisto style={styles.iconInput}name="locked" size={17} color="black" />
                            <TextInput style={styles.input} 
                            placeholder="| Senha"
                            secureTextEntry
                            value={senha}
                            onChangeText={setSenha}
                            />
                       </InputView>   
                        <InputView>
                            <Fontisto style={styles.iconInput}name="locked" size={17} color="black" />
                            <TextInput style={styles.input} 
                            placeholder="| Confirme a Senha"
                            secureTextEntry
                            value={senhaConf}
                            onChangeText={setSenhaConf}
                            />
                        </InputView>
                    </View>    

                    <View style={[styles.boxBottom,{ height:hp(15)}]}>
                        <Button
                        title='Criar Conta'
                        onPress={addBd}
                        />
                        <TXTOptions
                            title1='Já tem conta?'
                            title2='Faça Login'
                            style={{flexDirection:'row',marginLeft:'10%'}}
                            onPress={()=>router.push('/')}
                        />
                    </View>
                   <Footer/>
                </Container>
            </Background>
        </SafeAreaView>
    );

}