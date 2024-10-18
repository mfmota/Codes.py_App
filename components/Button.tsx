import { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'

type ButtonProps = {
  title?: string;
} & TouchableOpacityProps;

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ title, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity ref={ref} {...touchableProps} style={[styles.button, touchableProps.style]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    alignItems:'center',
    alignSelf:'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#1e39be',
    height:hp(4),
    paddingBottom:'1%',
    width:'35%',
    marginTop:'8%',
    marginBottom:'10%'
  },
  buttonText: {
    color: 'white',
    alignSelf:'center',
    fontFamily:'Montserrat-ExtraBold',
    fontSize:13
  },
});
