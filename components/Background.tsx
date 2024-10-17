import { StyleSheet, SafeAreaView, View,ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Background = ({ children }: { children: React.ReactNode }) => {
    return <ImageBackground style={styles.fundo}>{children}</ImageBackground>;
  };


  const styles = StyleSheet.create({
    fundo: {
       width:'100%',
        height: '100%'
    },
  });