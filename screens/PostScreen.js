import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';

export default class PostScreen extends React.Component
{
    render()
    {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.sav}/>

                <View>
                    <Text>
                        Create Post
                    </Text>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sav: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});
