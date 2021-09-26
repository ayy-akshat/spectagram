import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogoutScreen from '../screens/logoutScreen';
import ProfileScreen from '../screens/Profile';
import BotTabNav from './BottomTabs';

const Drawer = createDrawerNavigator();

export default class DrawerNav extends React.Component
{
    render()
    {
        return (
            <Drawer.Navigator>
                <Drawer.Screen
                name="Home"
                component={BotTabNav}
                screenOptions={{
                }}
                />
                <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                />
                <Drawer.Screen
                name="Logout"
                component={LogoutScreen}
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
