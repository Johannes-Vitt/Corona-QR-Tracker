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
            const id = '21313123';
            this.props.save(id)
        } else {
            Alert.alert("Informationen unvollständig","Bitte E-Mail Adresse oder Telefonnummer eingeben!");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{width: 150, height: 150}}
                    source={require('./qr-icon.png')}
                    //source={require('./Icon_full.png')}
                />
                <TextInput onChangeText={this.onChangeEmail} style={styles.input} placeholder='E-Mail Adresse'></TextInput>
                <Text>ODER</Text>
                <TextInput onChangeText={this.onChangeTel} style={styles.input} placeholder='Telefonnummer'></TextInput>
                <Button title="Weiter" type="outline" onPress={this.proceed}></Button>
            </View >);
    };
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
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