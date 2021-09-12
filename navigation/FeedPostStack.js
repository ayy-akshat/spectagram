import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FeedScreen from '../screens/FeedScreen';
import ViewPostScreen from '../screens/ViewPostScreen';

const Stack = createStackNavigator();

export default class FeedPostStack extends React.Component
{
    render()
    {
        return (
            <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            >
                <Stack.Screen
                name="FeedS"
                component={FeedScreen}
                />
                <Stack.Screen
                name="ViewPostS"
                component={ViewPostScreen}
                />
            </Stack.Navigator>
        );
    }

}