import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, Image, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import userCache from '../user';

const SpectagramHeader = () =>
{
    const styles = userCache.info.lightTheme ? lightStyles : darkStyles;
    return (
        <View style={styles.header}>
            <Image
                source={require("../assets/logo.png")}
                style={styles.headerImg}
            />
            <Text style={styles.headerTxt}>
                Spectagram
            </Text>
        </View>
    )
}

const lightStyles = StyleSheet.create({
    header: {
        marginVertical: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    headerImg: {
        width: RFValue(60),
        height: RFValue(60),
        marginHorizontal: 10
    },
    headerTxt: {
        fontWeight: 'bold',
        marginHorizontal: 10,
        fontSize: RFValue(30),
        color: "black"
    },
})

const darkStyles = StyleSheet.create({
    header: {
        marginVertical: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    headerImg: {
        width: RFValue(60),
        height: RFValue(60),
        marginHorizontal: 10
    },
    headerTxt: {
        fontWeight: 'bold',
        marginHorizontal: 10,
        fontSize: RFValue(30),
        color: "white"
    },
})

export default SpectagramHeader;