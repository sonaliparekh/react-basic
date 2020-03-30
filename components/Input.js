import React from  'react';
import { TextInput, StyleSheet} from 'react-native';

const Input = props => {
    return <TextInput {...props} style={{...styles.textInput, ...props.style}} />
}
const styles = StyleSheet.create({
    textInput: {
        borderBottomColor: 'grey',
        height: 30,
        borderBottomWidth: 1,
        marginVertical: 10
    }
});
export default Input