import React,{useState,useEffect} from 'react';
import {Text,View,ImageBackground,SafeAreaView, Pressable,TouchableOpacity,FlatList} from 'react-native';
import{styles,useGlobalFonts} from "../../styles";
import{db} from '../../../utils/firebase';
import Fundo from "../../../assets/images/fundo.png";
import Logo from "../../../assets/images/logoDIRPPG.png";
import { ref,onValue } from 'firebase/database';
import { differenceInDays, compareAsc } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Image } from 'expo-image'
import {Header} from '../../../components/header/header';
import { Background } from '~/components/Background';

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

export default function prazos (){
    const fontsLoaded = useGlobalFonts();

    const [eventos,setEventos] = useState<Evento[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

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

                const hoje = new Date();
                const eventosFiltrados = eventosList.filter(evento => {
                    const dataFim = new Date(evento.dataDoFim);
                    const diferencaDias = differenceInDays(dataFim, hoje);
                    return diferencaDias <= 5 && diferencaDias >= 0; // Eventos com dataDoFim em até 5 dias.
                });

                const eventosOrdenados = eventosFiltrados.sort((a, b) => {
                    const dataFimA = new Date(a.dataDoFim);
                    const dataFimB = new Date(b.dataDoFim);
                    return compareAsc(dataFimA, dataFimB);
                });

                setEventos(eventosOrdenados);
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
        
        return `${weekday}, ${day}/${month}`;
    };
    
    const router = useRouter();
    
    const handlePress = (id: string) => 
    {
        setSelectedEventId(prevId => (prevId === id ? null : id));
    };

    const getBackgroundColor = (dataDoFim: string) => {
        const hoje = new Date();
        const dataFim = new Date(dataDoFim);
        const diferencaDias = differenceInDays(dataFim, hoje);
    
        if (diferencaDias <= 1) {
            return '#ff3131'; // Vermelho para eventos que terminam em 1 dia
        } else if (diferencaDias <= 3) {
            return '#ff914d'; // Laranja para eventos que terminam em até 3 dias
        } else if (diferencaDias <= 5) {
            return '#ffbd59'; // Amarelo para eventos que terminam em até 5 dias
        } 
    };

    const renderItem = ({ item }: { item: Evento }) => 
        (
            <View style={styles.item} >

                <TouchableOpacity style={styles.list} 
                onPress={() => handlePress(item.id)}>

                    <View style={{flexDirection:'column',width:'85%'}}>
                        <Text style={styles.txtData}>{formatDate(item.dataDoFim)}</Text>
                        <Text style={styles.txtEvento}>{item.tituloDoEvento}</Text>
                    </View>
                    <View style={[styles.iconContainer,{marginTop:'5%'}]}>
                        <AntDesign name="clockcircleo" style={{ backgroundColor: getBackgroundColor(item.dataDoFim) }} size={22} color="white" />
                    </View>
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
                <View style={styles.containerTabs}>

                    <Text style={[styles.prazosTitle,{marginTop:'10%'}]}>Atenção para os eventos </Text>
                    <Text style={styles.prazosTitle}>que se aproximam </Text>

                    <View style={[styles.boxMiddle,{justifyContent:'center'}]}>
                        <FlatList
                                style={{marginTop:'10%'}}
                                data={eventos}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                            />
                    </View>        
                </View>               
            </Background>
        </SafeAreaView>

    );

}