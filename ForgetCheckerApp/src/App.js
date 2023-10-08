import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import DetailScreen from './screens/DetailScreen/DetailScreen';
import BluetoothDevices from './screens/bt';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Bluetooth" component={BluetoothDevices} />
            </Stack.Navigator>
        </NavigationContainer>
        
    );
};

export default App; 