import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FeedScreen from '../screens/FeedScreen';
import FeedPostStack from './FeedPostStack';
import PostScreen from '../screens/PostScreen';
import { RFValue } from 'react-native-responsive-fontsize';
import userCache from '../user';

const Tab = createMaterialBottomTabNavigator();

export default class BotTabNav extends React.Component {

    componentDidMount() {
        userCache.addRefresher(this);
    }
    componentWillUnmount() {
        userCache.removeRefresher(this);
    }

    render() {
        const styles = userCache.info.lightTheme ? lightStyles : darkStyles;
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
                    component={FeedPostStack}
                />
                <Tab.Screen
                    name="Post"
                    component={PostScreen}
                />
            </Tab.Navigator>
        );
    }

}

const lightStyles = StyleSheet.create({
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
const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomTabStyle: {
        backgroundColor: "#222222",
        height: 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 20,
        overflow: "hidden",
        position: "absolute"
    },
});
