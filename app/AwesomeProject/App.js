/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  StatusBar,
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  Linking,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';

import SignUp from './SignUp';

const STORAGE_KEY = '@save_name'

export default class QRona extends Component {
  // TODO: remove text
  state = {
    text: '',
    id: '',
  }

  componentDidMount() {
    this.retrieveData()
  }

  retrieveData = async () => {
    try {
      const id = await AsyncStorage.getItem(STORAGE_KEY)

      if (id !== null) {
        this.setState({ id })
      }
    } catch (e) {
      alert('Failed to load id.')
    }
  }

  save = async id => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, id)
      this.setState({ id })
    } catch (e) {
      alert('Failed to save id.')
    }
  }

  // TODO: remove
  onChangeText = text => this.setState({ text })

  // TODO: remove
  onSubmitEditing = () => {
    const onSave = this.save
    const { text } = this.state

    if (!text) return

    onSave(text)
    this.setState({ text: '' })
  }

  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };


  render() {
    const { text, id } = this.state;

    if (id !== '') {
      return (
        <QRCodeScanner
          onRead={this.onSuccess}
          topContent={
            <Text style={styles.centerText}>
              Go to{' '}
              <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on {this.state.id}
            your computer and scan the QRRRRRR code.
          </Text>
          }
          bottomContent={
            <View>
              <Button title='Delete Storage' onPress={() => this.save('')} />
            </View>
          }
        />
      );
    } else {
      return (
        <SignUp save={this.save} ></SignUp>
      );
    }
  }

}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
