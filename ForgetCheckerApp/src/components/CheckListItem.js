import React from 'react';
import { View, TextInput, Button } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import styles from '../screens/DetailScreen/DetailScreenStyles';

const CheckListItem = ({ item, index, onValueChange, onChangeText, onDelete }) => {
    return (
        <View style={styles.checklistItem} key={index}>
            <CheckBox
                value={item.checked}
                onValueChange={newValue => onValueChange(index, newValue)}
            />
            <TextInput
                value={item.text}
                onChangeText={newText => onChangeText(index, newText)}
                style={styles.input}
            />
            <Button title="Delete" onPress={() => onDelete(index)} color="red" />
        </View>
    );
};

export default CheckListItem;
