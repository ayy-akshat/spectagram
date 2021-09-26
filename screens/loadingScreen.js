import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends React.Component
{
    render()
    {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    Loading...
                </Text>
            </View>
        )
    }
    
    componentDidMount()
    {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () =>
    {
        firebase.auth().onAuthStateChanged(user => {
            if (user)
            {
                this.props.navigation.navigate("Main");
            }
            else
            {
                this.props.navigation.navigate("Login");
            }
        });
    }
}