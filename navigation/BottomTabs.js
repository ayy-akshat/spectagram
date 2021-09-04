import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-ionicons';
import FeedScreen from '../screens/FeedScreen';
import PostScreen from '../screens/PostScreen';

const Tab = createBottomTabNavigator();

export default class BotTabNav extends React.Component
{
    render()
    {
        return (
            <Tab.Navigator
            labeled={false}
            initialRouteName="Feed"
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {

                    /*
                    let iconName;
                    if (route.name == "Feed")
                    {
                        iconName = focused ? "book" : "book-outline";
                    }
                    else if (route.name == "Post")
                    {
                        iconName = focused ? "add-circle" : "add-circle-outline";
                    }
                    let col = focused ? "tomato" : "gray";
                    return <Icon name={iconName} size={size} color={color}/>
                    */
                    

                    let iconUrl;
                    if (route.name == "Feed")
                    {
                        iconUrl = focused 
                        ? "https://unpkg.com/ionicons@5.5.2/dist/svg/book.svg" 
                        : "https://unpkg.com/ionicons@5.5.2/dist/svg/book-outline.svg";
                    }
                    else if (route.name == "Post")
                    {
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
                            width: size,
                            height: size,
                        }}
                        />
                    )
                },
                headerShown: false
            })}
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
});
