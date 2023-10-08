import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import DetailScreen from './screens/DetailScreen/DetailScreen';
import SettingsScreen from './screens/SetteingsScreen/SettingsScreen';
import SetReminderScreen from './screens/SetReminderScreen/SetReminderScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="SetReminder" component={SetReminderScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        
    );
};

export default App; 