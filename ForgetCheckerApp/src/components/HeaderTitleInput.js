import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';


const HeaderTitleInput = ({ initialName, onSave }) => {
    const [name, setName] = useState(initialName);

    useEffect(() => {
        setName(initialName);
    }, [initialName]);

    return (
    <TextInput
        value={name}
        onChangeText={(text) => {
            setName(text);
            onSave(text);
        }}
        style={{fontSize: 18 }}
        placeholder="Enter name"
    />
    );
};

export default HeaderTitleInput;  