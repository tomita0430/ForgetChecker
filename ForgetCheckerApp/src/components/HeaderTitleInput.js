import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';


const HeaderTitleInput = ({ initialName, onSave }) => {
    const [name, setName] = useState(initialName);

    useEffect(() => {
        console.log("header");
        console.log(initialName);
        setName(initialName);
    }, [initialName]);

    return (
    <TextInput
        value={name}
        onChangeText={setName}
        onEndEditing={() => onSave(name)}
        style={{fontSize: 18 }}
        placeholder="Enter name"
    />
    );
};

export default HeaderTitleInput;  