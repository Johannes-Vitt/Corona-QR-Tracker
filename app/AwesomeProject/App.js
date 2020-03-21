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
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Overlay } from 'react-native-elements';

import QRCodeScanner from 'react-native-qrcode-scanner';

import { sha256 } from 'react-native-sha256';

import SignUp from './SignUp';

const STORAGE_KEY = '@save_name'

export default class QRona extends Component {

  state = {
    id: '',
    greenOverlay: false,
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

  createVisit = async (user_id, poi_id) => {
    try {
      const secret = 'qrona_app';
      const stringToHash =
        secret + JSON.stringify({
          uid: user_id,
          pid: poi_id,
        }) + secret;
      let hash = await sha256(stringToHash).then(hash => {
        return hash;
      })

      let reponse = await fetch('http://192.168.0.117:2222/api/view', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user_id,
          pid: poi_id,
          hash: hash,
        }),
      });
      responseJSON = await reponse.json();
      alert(JSON.stringify(responseJSON));
    } catch (e) {
      alert('Failed to create Visit')
    }
  }

  createUser = async user => {
    try {
      const secret = 'qrona_app';
      const stringToHash =
        secret + JSON.stringify({
          tel: user.tel,
          mail: user.mail,
        }) + secret;
      let hash = await sha256(stringToHash).then(hash => {
        return hash;
      })

      let reponse = await fetch('http://192.168.0.117:2222/api/user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tel: user.tel,
          mail: user.mail,
          hash: hash,
        }),
      });
      responseJSON = await reponse.json();
      this.save(responseJSON.code);
    } catch (e) {
      alert('Failed to create User')
    }
  }

  // TODO: remove
  testRequest = () => {
    this.createVisit('1234', '31324');
  }
  onSuccess = e => {
    this.createVisit(this.state.id, e.data);
    this.setState({ id: this.state.id, greenOverlay: true });
    setTimeout(function () {
      this.setState({ id: this.state.id, greenOverlay: false });
    }.bind(this), 500)
  };


  render() {
    const id = this.state.id;


    if (id !== '') {
      return (
        <View style={styles.mainView}>
          <Overlay isVisible={this.state.greenOverlay} fullScreen={true} overlayBackgroundColor='green' overlayStyle={styles.greenOverlay}>
            <Text style={styles.overlayText}>Erfolgreich registriert!</Text>
          </Overlay>

          <QRCodeScanner
            onRead={this.onSuccess}
            cameraStyle={styles.cameraView}
            topViewStyle={styles.zeroContainer}
            bottomViewStyle={styles.zeroContainer}
          />
        </View>
      );
    } else {
      return (
        <SignUp save={this.save} createUser={this.createUser}></SignUp>
      );
    }
  }

}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  mainView: {
    flex: 1,
  },
  zeroContainer: {
    flex: 0,
    height: 0,
  },
  cameraView: {
    height: Dimensions.get('window').height,
  },
  idOverlay: {
    opacity: 0.8,
    marginBottom: 30,
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
  greenOverlay: {
    opacity: 0.5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 40,
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
