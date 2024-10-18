import React,{useState,useEffect} from 'react';
import {Text,View,TextInput,ImageBackground,SafeAreaView, Pressable,TouchableOpacity,FlatList} from 'react-native';
import{styles,useGlobalFonts} from "../../styles";
import{db} from '../../../utils/firebase';
import Fundo from "../../../assets/images/fundo.png";
import Logo from "../../../assets/images/logoDIRPPG.png";
import { ref,onValue } from 'firebase/database';
import { isSameDay, isSameWeek, isSameMonth } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {Header} from '../../../components/header/header';
import { Background } from '~/components/Background';
import { ContainerDrawer } from '~/components/ContainerDrawer';

export type Evento = {
    id:string;
    convidados: string;
    dataDeInicio: string;
    dataDoFim: string;
    descricaoDoEvento: string;
    eventoDeDiaInteiro: boolean;
    local: string;
    nucleo: string;
    tituloDoEvento: string;
}

export default function calendario (){

    const fontsLoaded = useGlobalFonts();
             
    const [eventos,setEventos] = useState<Evento[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [filterOption, setFilterOption] = useState<string>('');
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false); 
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const {top,bottom}= useSafeAreaInsets();

    useEffect(  () => {

        const starCountRef = ref(db);

        const unsubscribe = onValue(starCountRef, (snapshot) => 
        {
            const data = snapshot.val();
                
            if (data) 
            {
                const eventosList: Evento[] = Object.keys(data).map(key => ({
                    id: key,
                    convidados: data[key].convidados || '',
                    dataDeInicio: data[key].dataDeInicio || '',
                    dataDoFim: data[key].dataDoFim || '',
                    descricaoDoEvento: data[key].descricaoDoEvento || '',
                    eventoDeDiaInteiro: data[key].eventoDeDiaInteiro || false,
                    local: data[key].local || '',
                    nucleo: data[key].nucleo || '',
                    tituloDoEvento: data[key].tituloDoEvento || '',
                }));
                setEventos(eventosList);
            }
            else 
            {
                console.log('Nenhum dado encontrado');
            }
        });

        return () => unsubscribe();

    }, []); 

    const formatDate = (dateString: string) => 
    {
        const date = new Date(dateString);
        const weekday = date.toLocaleDateString('pt-BR', { weekday: 'short' });
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${weekday}, ${day}/${month}`;
    };

    const router = useRouter();

    const handlePress = (id: string) => 
    {
        setSelectedEventId(prevId => (prevId === id ? null : id));
    };

        const handleFilterSelection = (option: string) => {
            setFilterOption(option);
            setDropdownVisible(false); 
        };

    const filteredEventos = eventos.filter(evento =>
    {
        const matchesSearch = evento.tituloDoEvento.toLowerCase().includes(searchText.toLowerCase());
        const currentDate = new Date();
        const startDate = new Date(evento.dataDeInicio);
    
        if (filterOption === 'dia') 
        {
            return matchesSearch && isSameDay(startDate, currentDate);
        } 

        else if (filterOption === 'semana') 
        {
            return matchesSearch && isSameWeek(startDate, currentDate);
        } 

        else if (filterOption === 'mes') 
        {
            return matchesSearch && isSameMonth(startDate, currentDate);
        } 

        else 
        {
            return matchesSearch;
        }
    });
           


    const renderItem = ({ item }: { item: Evento }) => 
    (
        <View style={styles.item}>

            <TouchableOpacity style={styles.list} 
            onPress={() => handlePress(item.id)}>

                <View style={{flexDirection:'column',width:'90%'}}>
                    <Text style={styles.txtData}>{formatDate(item.dataDoFim)}</Text>
                    <Text style={styles.txtEvento}>{item.tituloDoEvento}</Text>
                </View>
                
                <AntDesign style={{justifyContent:'flex-end'}}name="down" size={18} color="black" />

            </TouchableOpacity>

            {selectedEventId === item.id && (
                <View style={{paddingLeft:'2%',paddingVertical:'3%'}}>
                    <Text style={styles.txtDetalhes}>Dia todo: {item.eventoDeDiaInteiro ? 'Sim' : 'Não'}</Text>   
                    <Text style={styles.txtDetalhes}>Local: {item.local}</Text>
                    <Text style={styles.txtDetalhes}>Núcleo: {item.nucleo}</Text>
                    <Text style={styles.txtDetalhes}>Convidados: {item.convidados}</Text>
                    <Text style={styles.txtDetalhes}>{item.descricaoDoEvento}</Text>
                </View>
            )}
        </View>
    );

    if (!fontsLoaded) {
        return null; 
      }

    return(

        <SafeAreaView>
            <Background>
               
                <Header/>
                
                <ContainerDrawer style={{paddingBottom:bottom}}>

                    <View style={[styles.boxTop,{marginTop:'-8%'}]}>

                        <Text style={styles.title}>Calendário</Text>
                       
                        <View style={styles.buscaContainer}>

                            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} 
                                style={styles.filterButton}>
                                <AntDesign name="filter" size={24} color="#black" />
                            </TouchableOpacity>

                            <View style={styles.inputViewAgenda}>
                                <TextInput
                                style={styles.inputAgenda}
                                placeholder='Pesquisar'
                                placeholderTextColor='#ddd'
                                value={searchText}
                                onChangeText={(t) => setSearchText(t)}>
                                </TextInput>
                                <Feather style={styles.iconAgenda} name="search" size={16} color="black" />
                            </View> 

                        </View>

                        {dropdownVisible && (
                            <View style={styles.dropdown}>
                                <TouchableOpacity onPress={() => handleFilterSelection('dia')} style={styles.dropdownItem}>
                                    <Text style={styles.filterText}>Dia</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => handleFilterSelection('semana')} style={styles.dropdownItem}>
                                    <Text style={styles.filterText}>Semana</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => handleFilterSelection('mes')} style={styles.dropdownItem}>
                                    <Text style={styles.filterText}>Mês</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => handleFilterSelection('todos')} style={styles.dropdownItem}>
                                        <Text style={styles.filterText}>Todos</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        
                    </View>
                    <View style={[styles.boxMiddle,{marginTop:'-10%'}]}>
                        {filteredEventos.length > 0 ? (
                            <FlatList
                                data={filteredEventos}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        ) : (
                            <Text></Text>
                        )}
                    </View>
                   
                </ContainerDrawer>
                  
            </Background>

        </SafeAreaView>


    );
};