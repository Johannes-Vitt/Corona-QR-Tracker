import React, { Component } from "react"
import { TextInput, Text, View, StyleSheet, TouchableOpacity, AsyncStorage, Alert, Image } from "react-native"
import { Button } from 'react-native-elements';

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
            <View style={styles.container}>
                <Image
                    style={{width: 150, height: 150, marginBottom: 110}}
                    source={require('./ressources/qr-code-green-transparent.png')}
                />
                <TextInput onChangeText={this.onChangeEmail} style={styles.input} placeholder='E-Mail Adresse' placeholderTextColor='grey'></TextInput>
                <Text style={styles.oder}>ODER</Text>
                <TextInput onChangeText={this.onChangeTel} style={styles.input} placeholder='Telefonnummer' placeholderTextColor='grey'></TextInput>
                <Button color="#000000"title="Scannen" type="outline" onPress={this.proceed}></Button>
            </View> );
    };
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    oder:{
        color: '#42EABE',
        fontSize: 20
    },
    input: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 10,
        padding: 7,
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: '#A9A9A9',
        borderWidth: 1,
        borderColor: '#42EABE'
    },
    button: {
        fontSize: 50,
        color: '#42EABE',
        backgroundColor: '#147efb'
    },
});