import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DrawerNav from './navigation/Drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/loginScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingScreen from './screens/loadingScreen';
import firebase from 'firebase';
import dbConfig from './dbConfig';

export default function App() {
  return (
    <NavigationContainer>
      <AppCont/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppSN = createSwitchNavigator({
  Loading: LoadingScreen,
  Login: LoginScreen,
  Main: DrawerNav
});

const AppCont = createAppContainer(AppSN);

!firebase.apps.length ? firebase.initializeApp({
  apiKey: "AIzaSyCbEEBj3rX4a9SX5XZWI_XVA-dobukeobU",
  authDomain: "spectagram-310d7.firebaseapp.com",
  projectId: "spectagram-310d7",
  storageBucket: "spectagram-310d7.appspot.com",
  messagingSenderId: "787084071988",
  appId: "1:787084071988:web:ee56d11d8565b1eaa6a661"
}) : firebase.app();