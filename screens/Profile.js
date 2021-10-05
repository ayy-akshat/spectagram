import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import SpectagramHeader from '../components/header';
import userCache from '../user';
import firebase from 'firebase';
import { Button } from 'react-native-paper';
import { Switch } from 'react-native-gesture-handler';

export default class ProfileScreen extends React.Component {
    componentDidMount() {
        userCache.addRefresher(this);
    }

    render() {


        console.log("profile", userCache.info);

        const styles = userCache.info.lightTheme ? lightStyles : darkStyles;

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.sav} />

                <View style={{
                    alignItems: 'center'
                }}>
                    <SpectagramHeader />

                    <Text style={styles.screenTitle}>
                        Profile
                    </Text>

                    <View style={styles.profileContainer}>

                        <View style={styles.profileSection}>
                            <Image
                                source={{
                                    uri: userCache.info.pfp
                                }}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50
                                }}
                            />
                        </View>

                        <View style={styles.profileSection}>
                            <Text style={styles.profileTxt}>
                                {userCache.info.firstName + " " + userCache.info.lastName}
                            </Text>
                        </View>

                        <View style={styles.profileSection}>
                            <Text style={styles.profileTxt}>
                                {userCache.info.gmail}
                            </Text>
                        </View>

                        <View style={styles.profileSection}>
                            <Text style={styles.profileTxt}>
                                Current App Theme: <Text style={{ fontStyle: 'italic' }}>{userCache.info.lightTheme ? "Light theme" : "Dark theme"}</Text>
                            </Text>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignSelf: 'center',
                            }}>
                                <Text style={[styles.profileTxt, {
                                    marginTop: 5,
                                    marginRight: 10
                                }]}>
                                    Switch Theme:
                                </Text>
                                <Switch
                                    style={{
                                        alignSelf: 'center',
                                    }}
                                    trackColor={{
                                        false: "white",
                                        true: "black"
                                    }}
                                    thumbColor={userCache.info.lightTheme ? "white" : "black"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={userCache.toggleTheme}
                                    value={userCache.info.lightTheme}
                                />
                            </View>
                        </View>

                        <View style={styles.profileSection}>
                            <TouchableOpacity style={styles.logoutBtn}>
                                <Text style={styles.logoutBtnTxt} onPress={() => {
                                    this.props.navigation.navigate("Logout");
                                }}>
                                    Log out
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        );
    }

}

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
    sav: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    screenTitle: {
        textAlign: 'center',
        fontSize: RFValue(20),
        fontWeight: 'bold',
        marginVertical: 20
    },
    profileContainer: {
        alignItems: 'center',
        textAlign: 'center',
        width: "100%"
    },
    profileSection: {
        width: "100%",
        paddingTop: 10,
    },
    profileTxt: {
        fontSize: 15,
    },
    logoutBtn: {
        backgroundColor: "#222222",
        borderRadius: 10,
        padding: 10
    },
    logoutBtnTxt: {
        fontSize: 20,
        color: "white"
    }
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: "#161616",
    },
    sav: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    screenTitle: {
        textAlign: 'center',
        fontSize: RFValue(20),
        fontWeight: 'bold',
        marginVertical: 20,
        color: "white"
    },
    profileContainer: {
        alignItems: 'center',
        textAlign: 'center',
        width: "100%"
    },
    profileSection: {
        width: "100%",
        paddingTop: 10,
    },
    profileTxt: {
        fontSize: 15,
        color: "white"
    },
    logoutBtn: {
        backgroundColor: "#bdbdbd",
        borderRadius: 10,
        padding: 10
    },
    logoutBtnTxt: {
        fontSize: 20,
        color: "black"
    }
});
