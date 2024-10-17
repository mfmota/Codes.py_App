import React from 'react';
import {Text,View,ImageBackground,SafeAreaView, Pressable,TextInput} from 'react-native'
import { Image } from 'expo-image'
import{styles, useGlobalFonts} from "../styles"
import Fundo from '../../assets/images/fundo.png'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import Logo from '../../assets/images/logoDIRPPG.png'
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useState,useRef} from "react";
import {MultipleSelectList }from 'react-native-dropdown-select-list';
import {Header} from '../../components/header/header'
import { Background } from '~/components/Background';
import { Button } from '~/components/Button';

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

export default function perfil (){

    const fontsLoaded = useGlobalFonts();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const[senhaConf, setSenhaConf] = useState('');

    if (!fontsLoaded) {
        return null; 
      }

    return(
        <SafeAreaView>
            <Background>
               <Header/>
                <View style={styles.containerTabs}>

                    <View style={styles.boxTopCadastro}>
                    <Text style={[styles.cadastro]}>Atualizar</Text> 
                    </View>

                    <View style={styles.boxMiddle}>
                        
                        <View style={[styles.inputViewPerfil]}>
                            <Ionicons style={styles.iconInput}name="person" size={18} color="black" />
                            <TextInput style={styles.input} 
                            placeholder="| Nome"
                            value={nome}
                            onChangeText={setNome}
                            />
                        </View>

                        <View style={[styles.inputViewPerfil]}>
                            <MaterialIcons style={styles.iconInput}name="email" size={18} color="black" />
                            <TextInput style={styles.input} 
                                placeholder="| Email"
                                keyboardType='email-address'
                                autoComplete='email'
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                    
                            <MultipleSelectList
                                setSelected={(val: string[]) => setSelected(val)}
                                data={data}
                                label='Núcleo'
                                placeholder='Núcleo'
                                searchPlaceholder='Pesquise'
                                labelStyles={{width:'80%'}}
                                boxStyles={{width:'80%',backgroundColor:'#e8ebfa',alignSelf:'center',borderRadius:40,borderWidth:0}}
                                dropdownStyles={{zIndex:999,paddingBottom:'2%',overflow:'scroll',backgroundColor:'#e8ebfad',width:'80%',alignSelf:'center',borderRadius:40,position:'absolute'}}
                                
                            />       
                            
                        <View style={[styles.inputViewPerfil]}>
                            <Fontisto style={styles.iconInput}name="locked" size={17} color="black" />
                                <TextInput style={styles.input} 
                                placeholder="| Senha"
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                                />
                        </View>     
                        <View style={[styles.inputViewPerfil]}>
                            <Fontisto style={styles.iconInput}name="locked" size={17} color="black" />
                                <TextInput style={styles.input} 
                                    placeholder="| Confirme a Senha"
                                    secureTextEntry
                                    value={senhaConf}
                                    onChangeText={setSenhaConf}
                            />
                        </View>

                        <Button
                            title='Atualizar'
                            style={{width:'40%',height:'8%'}}
                        />

                    </View>                       
                </View>
            </Background>
        </SafeAreaView>
    );


}