import React from 'react';
import {Text,View,TextInput,ImageBackground,SafeAreaView, Pressable} from 'react-native';
import { Image } from 'expo-image';
import{styles} from "./styles";
import {useState} from "react";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { router } from 'expo-router';
import{auth} from '../utils/firebase';
import { useGlobalFonts } from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import {MultipleSelectList }from 'react-native-dropdown-select-list';
import Logo from 'assets/images/logoDIRPPG.png';
import Fundo from 'assets/images/fundo.png';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { Background } from '~/components/Background';
import { InputView } from '~/components/InputView';

const data = [
    {key:'1', value:'DIRPPG-CT'},
    {key:'2', value:'PROPPG'},
    {key:'3', value:'CPGEI'},
    {key:'4', value:'PPGA'},
    {key:'5', value:'PPGCA'},
    {key:'6', value:'PPGCTA'},
    {key:'7', value:'PPGEB'},
    {key:'8', value:'PPGEC'},
    {key:'9', value:'PPGEF'},
    {key:'10', value:'PPGEL'},
    {key:'11', value:'PPGEM'},
    {key:'12', value:'PPGEFA'},
    {key:'13', value:'FCET'},
    {key:'14', value:'PGP'},
    {key:'15', value:'PPGQ'},
    {key:'16', value:'PPGSAU'},
    {key:'17', value:'PPGSE'},
    {key:'18', value:'PPGTE'},
    {key:'19', value:'PROFMAT'},
    {key:'20', value:'PROFIAP'},
    {key:'21', value:'DIREC-CT'},
    {key:'22', value:'DIRGE-CT'},
    {key:'23', value:'DIRPLAD-CT'},

]

export default function criarLogin(){

    const fontsLoaded = useGlobalFonts();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
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
                    <View style={styles.boxTopCadastro}>
                        <Text style={styles.cadastro}>Cadastro</Text> 
                    </View>

                    <View style={styles.boxMiddleCadastro}>
                   
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
                        <MultipleSelectList
                                setSelected={(val: string[]) => setSelected(val)}
                                data={data}
                                label='Núcleo'
                                placeholder='Núcleo'
                                searchPlaceholder='Pesquise'
                                labelStyles={styles.label}
                                boxStyles={styles.box}
                                dropdownStyles={styles.drop}
                            />       
                            
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

                    <View style={styles.boxBottomCadastro}>

                        <Button
                            title='Criar Conta'
                            onPress={addBd}
                        />


                        <Pressable style={{flexDirection:'row',marginLeft:'10%'}} onPress={()=>router.push('/')} >
                        <Text style={styles.txtPergunta}> Já tem conta?</Text>
                        <Text style={styles.txtResposta}> Faça login</Text>
                        </Pressable> 

                    </View>
                    
                    
                    <View style={styles.boxLogoCadastro}>
                            
                            <Image source={Logo} style={styles.logo}></Image>
                    </View>

                    
                </Container>

            </Background>


        </SafeAreaView>


    );

}