import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, Image, StatusBar } from 'react-native';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import { Ionicons } from '@expo/vector-icons';

export default class LoginScreen extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={{ alignItems: 'center', backgroundColor: 'gray', flex: 1}}>
                <SafeAreaView style={styles.sav} />

                <View style={styles.appHeader}>
                    <View style={styles.appIcon}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={{
                                width: 60,
                                height: 60,
                                resizeMode: 'contain',
                                marginLeft: 10,
                            }}
                        />
                    </View>

                    <View style={styles.appTitleContainer}>
                        <Text style={styles.appTitleText}>
                            Spectagram
                        </Text>
                    </View>
                </View>

                <View style={{marginTop: 100}}>
                    <TouchableOpacity onPress={this.signInWithGoogleAsync} style={{
                        borderRadius: 200,
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        padding: 20,
                    }}>
                        <Ionicons name="logo-google" size={30} color="black"/>
                        <Text style={{fontSize: 30, marginLeft: 50}}>
                            Sign in with Google
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                behavior: "web",
                androidClientId: "787084071988-3dk99n62ps9m8kk0576kh1haohutnc5s.apps.googleusercontent.com",
                iosClientId: "787084071988-d0i82gakago2s7aajqerumgdnm34s9la.apps.googleusercontent.com",
                webClientId: "787084071988-2etbmcc5clbefjef650o67lvlhrnc645.apps.googleusercontent.com",
                clientId: "787084071988-2etbmcc5clbefjef650o67lvlhrnc645.apps.googleusercontent.com",
                scopes: [
                    "profile",
                    "email"
                ]
            });

            if (result.type === "success") {
                this.onSignIn(result);
                return result.accessToken;
            }
            else {
                return {
                    cancelled: "true"
                }
            }

        } catch (error) {
            return {
                error: true
            }
        }
    }

    onSignIn = (googleUser) => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken
                );

                googleUser.accessToken

                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential).then(() => {
                    if (result.additionalUserInfo.isNewUser) {
                        firebase.database().ref("/users/" + result.user.uid).set({
                            gmail: result.user.email,
                            pfp: result.additionalUserInfo.profile.picture,
                            locale: result.additionalUserInfo.profile.locale,
                            firstName: result.additionalUserInfo.profile.given_name,
                            lastName: result.additionalUserInfo.profile.family_name,
                        })
                    }
                    this.props.navigation.navigate("Main");
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            } else {
                console.log('User already signed-in Firebase.');
            }
        });
    }

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth().GoogleAuthProvider.PROVIDER_ID && providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    return true;
                }
            }
            return false;
        }
    }
}

const styles = StyleSheet.create({
    sav: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    appHeader: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5
    },
    appIcon: {
    },
    appTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    appTitleText: {
        color: "white",
        fontSize: 28,
        padding: 20,
    },
})