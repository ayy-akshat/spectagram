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

!firebase.apps.length ? firebase.initializeApp(dbConfig) : firebase.app();