import React, { Component } from "react"
import { TextInput, Text, View, StyleSheet, Button, TouchableOpacity, AsyncStorage } from "react-native"

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
            const id = '21313123';
            this.props.save(id)
        } else {
            alert('Bitte E-Mail Adresse oder Telefonnummer eingeben!')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput onChangeText={this.onChangeEmail} style={styles.input} placeholder='E-Mail Adresse'></TextInput>
                <Text>ODER</Text>
                <TextInput onChangeText={this.onChangeTel} style={styles.input} placeholder='Telefonnummer'></TextInput>
                <Button title="Weiter" onPress={this.proceed}></Button>
            </View >);
    };
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        fontSize: 30,
        marginTop: 50,
        marginBottom: 50,
    },
    button: {
        fontSize: 50,
        color: '#000000',
        backgroundColor: '#147efb'
    },
});