import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FeedScreen from '../screens/FeedScreen';
import PostScreen from '../screens/PostScreen';
import { RFValue } from 'react-native-responsive-fontsize';

const Tab = createMaterialBottomTabNavigator();

export default class BotTabNav extends React.Component {
    render() {
        return (
            <Tab.Navigator
                labeled={false}
                initialRouteName="Feed"
                barStyle={styles.bottomTabStyle}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {

                        let iconName;
                        if (route.name == "Feed")
                        {
                            iconName = focused ? "book" : "book-outline";
                        }
                        else if (route.name == "Post")
                        {
                            iconName = focused ? "add-circle" : "add-circle-outline";
                        }

                        return <Ionicons name={iconName} color={color} size={RFValue(20)}/>


                        /*
                        let iconUrl;
                        if (route.name == "Feed") {
                            iconUrl = focused
                                ? "https://unpkg.com/ionicons@5.5.2/dist/svg/book.svg"
                                : "https://unpkg.com/ionicons@5.5.2/dist/svg/book-outline.svg";
                        }
                        else if (route.name == "Post") {
                            iconUrl = focused
                                ? "https://unpkg.com/ionicons@5.5.2/dist/svg/add-circle.svg"
                                : "https://unpkg.com/ionicons@5.5.2/dist/svg/add-circle-outline.svg";
                        }

                        // Ionicons aren't working so I am using <Image/> for now (not working on phone for some reason)

                        return (
                            <Image
                                source={{
                                    uri: iconUrl
                                }}
                                style={{
                                    width: RFValue(size),
                                    height: RFValue(size),
                                }}
                            />
                        )
                        */
                    },
                    headerShown: false
                })}
                activeColor="tomato"
                inactiveColor="gray"
            >
                <Tab.Screen
                    name="Feed"
                    component={FeedScreen}
                />
                <Tab.Screen
                    name="Post"
                    component={PostScreen}
                />
            </Tab.Navigator>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomTabStyle: {
        backgroundColor: "#dddddd",
        height: 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 20,
        overflow: "hidden",
        position: "absolute"
    },
});
