import React, { Component } from "react"
import { TextInput, Text, View, StyleSheet, TouchableOpacity, AsyncStorage, Alert, Image } from "react-native"
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const STORAGE_KEY = '@save_name'

export default class SignUp extends Component {
    state = {
        email: '',
        tel: '',
    }

    onChangeEmail = email => {
        this.setState({ email: email, tel: this.state.tel });
    }

    onChangeTel = tel => {
        this.setState({ email: this.state.email, tel: tel });
    }

    proceed = () => {
        if (this.state.email !== '' || this.state.tel !== '') {
            //TODO get the ID from the API
            this.props.createUser({ tel: this.state.tel, mail: this.state.email });
        } else {
            Alert.alert("Informationen unvollständig","Bitte E-Mail Adresse oder Telefonnummer eingeben!");
        }
    }

    render() {
        return (
            <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={['#76D7EC','#7AEA95', '#42EABE']} style={styles.linearGradient}>
                <Image
                    style={{width: 150, height: 150}}
                    source={require('./ressources/qr-code-white-transparent-soft.png')}
                    //source={require('./ressources/qr-icon.png')}
                    //source={require('./ressources/Icon_full.png')}
                />
                <TextInput onChangeText={this.onChangeEmail} style={styles.input} placeholder='E-Mail Adresse' placeholderTextColor='white'></TextInput>
                <Text style={styles.oder}>ODER</Text>
                <TextInput onChangeText={this.onChangeTel} style={styles.input} placeholder='Telefonnummer' placeholderTextColor='white'></TextInput>
                <Button color="#000000"title="Weiter" type="outline" onPress={this.proceed}></Button>
            </LinearGradient> );
    };
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    oder:{
        color: 'white'
    },
    input: {
        fontSize: 30,
        marginTop: 50,
        marginBottom: 50,
        color: 'white',
    },
    button: {
        fontSize: 50,
        color: '#000000',
        backgroundColor: '#147efb'
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});