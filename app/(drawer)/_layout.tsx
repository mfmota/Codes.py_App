import {MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import customLayout from '../../components/_customLayout';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import 'react-native-gesture-handler';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const DrawerLayout = () => (

  <Drawer drawerContent={customLayout} 
  screenOptions={{headerShown:false, 
  drawerHideStatusBarOnOpen:true,
  drawerLabelStyle:{marginLeft:-20}}}>

   
    <Drawer.Screen
      name="(tabs)"
      options={{
        drawerLabel:'Calendário',
        drawerIcon: ({}) => (
          <AntDesign name="calendar" size={24} color="black" />
        ),
      }}
    />

    <Drawer.Screen
      name="site"
      options={{
        drawerLabel:'Site',
        drawerIcon: ({}) => (
          <AntDesign name="earth" size={24} color="black" />
        ),
      }}
    />

    <Drawer.Screen
      name="contato"
      options={{
        title: 'Contato',
        drawerLabel:'Contato',
        drawerIcon: ({}) => (
          <MaterialIcons name="support-agent" size={24} color="black" />
        ),
      }}
    />

    <Drawer.Screen
      name="perfil"
      options={{
        title: 'perfil',
        drawerLabel:'Perfil',
        drawerIcon: ({}) => (
          <FontAwesome5 name="user-edit" size={24} color="black" />
        ),
      }}
  />
  </Drawer>
);

export default DrawerLayout;
