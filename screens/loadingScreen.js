import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import userCache from '../user';

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
                console.log("is user", user);
                this.props.navigation.navigate("Main");
                console.log("user uid", user.uid);
                var uid = firebase.auth().currentUser.uid;
                userCache.fetchInfo();
            }
            else
            {
                console.log("no user");
                this.props.navigation.navigate("Login");
            }
        });
    }
}