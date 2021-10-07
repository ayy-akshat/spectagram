import React from "react";
import { View, Image, Text, StyleSheet, SafeAreaView } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import SpectagramHeader from "./header";
import userCache from "../user";
import { Drawer } from "react-native-paper";

export default class CustomSideBarOption extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;

        const styles = {
            ...(userCache.info.lightTheme ? lightStyles : darkStyles),
            sav: {
                height: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }
        }
        return (
            <View style={styles.container}>
                <SpectagramHeader />
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </View>
        )
    }
}

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgray"
    }
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#555555"
    }
});