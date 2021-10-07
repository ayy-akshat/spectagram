import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomSideBarOption from '../components/customSideBarOptions';
import LogoutScreen from '../screens/logoutScreen';
import ProfileScreen from '../screens/Profile';
import userCache from '../user';
import BotTabNav from './BottomTabs';

const Drawer = createDrawerNavigator();

export default class DrawerNav extends React.Component {
    constructor(props)
    {
        super(props);
    }


    render() {
        return (
            <Drawer.Navigator
                screenOptions={{
                    activeTintColor: userCache.info.lightTheme ? "black" : "white",
                    inactiveTintColor: userCache.info.lightTheme ? "black" : "white",
                }}
                drawerContent={(props) => <CustomSideBarOption {...props} />}
            >
                <Drawer.Screen
                    name="Home"
                    component={BotTabNav}
                    options={{ unmountOnBlur: true }}
                />
                <Drawer.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ unmountOnBlur: true }}
                />
                <Drawer.Screen
                    name="Logout"
                    component={LogoutScreen}
                    options={{ unmountOnBlur: true }}
                />
            </Drawer.Navigator>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
