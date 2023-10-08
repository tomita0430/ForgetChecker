import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { 
    View,
    Button,} from 'react-native';
import HeaderTitleInput from '../../components/HeaderTitleInput'
import CheckListItem from '../../components/CheckListItem'
import styles from './DetailScreenStyles';
import { loadNote, saveNote, deleteNote } from '../../utils/storageOperations';
import { addCheckListItem, deleteCheckListItem, suggestChecklistItems } from '../../utils/checkListOperations';
import { NativeModules, NativeEventEmitter } from "react-native";


const DetailScreen = ({navigation, route}) => {
    if (!route.params || !route.params.note || !route.params.note.id) {
        console.error('NoteID is not provided');
        return null; 
    }
    
    const noteID = route.params.note.id.toString();
    const [noteName, setNoteName] = useState("");
    const [checklist, setChecklist] = useState([]);
    const BleManagerModule = NativeModules.BleManager;

    
    const handleSaveName = useCallback(
        (newName) => {
            setNoteName(newName);
        },[]
    );

    const handleSuggest = () => {
        const suggestedItems = suggestChecklistItems();
        setChecklist([...checklist, ...suggestedItems]);
    };

    useEffect(() => {
        loadNote(noteID, setNoteName, setChecklist);
    }, []);
    
    useEffect(() => {
        saveNote(noteID, noteName, checklist); 
    }, [noteName, checklist, saveNote]);
    
    useEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
            <HeaderTitleInput initialName={noteName} onSave={handleSaveName} {...props} />
            ),
        });
    }, [navigation, handleSaveName, noteName]); 

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <Button title="Save" onPress={() => saveNote(noteID, noteName, checklist)} />
                    <Button title="Delete" onPress={() => deleteNote(noteID)} color="red" />
                </View>
                ),
            });
    }, [navigation, checklist]);

    const BTScan = () => {
        //getConnectedBluetoothDevices();

        /*
        try {
            const connected = BluetoothClassic.getConnectedDevices();
            console.log("getConnectedDevices");
        } catch (error) {
            console.error('Error scanning devices:', error);
        }
        BleManager.start({ showAlert: false });
        // スキャン結果のリスナーを設定
        BleManager.scan([], -1, true).then(() => {//スキャンに成功したら 
            console.log('Scan started');//コンソールに左記を表示する
        })
        .catch((error) => {//スキャンに失敗したら
            console.log(error);//コンソールにエラーを表示する
        });
        BleManager.getDiscoveredPeripherals([])
        .then((peripheralsArray) => {
            console.log('Discovered peripherals:', peripheralsArray);
        })
        .catch((error) => {
            console.error('Error getting discovered peripherals:', error);
        });
        */
        /*
        useEffect(() => {
            const listeners = [
                bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral),
            ];
            return () => {
                for (const listener of listeners) {
                    listener.remove();
                }
            };
        }, []);
        const handleDiscoverPeripheral = (peripheral) => {
            console.log(peripheral.id);
            result.push(peripheral);
        }
        */
        /*
        BleManager.setPeripheralNotificationCallback((peripheral) => {
            if (peripheral.name === "BTMEL") {
                // 特定のデバイスが検出されたら、アイテムを自動的にチェックするロジックをここに追加
                const newChecklist = [...checklist];
                newChecklist[0].checked = true;
                setChecklist(newChecklist);
            }
        });
        */
        
        /*
        if (checklist.length > 0) {
            const newChecklist = [...checklist];
            newChecklist[0].checked = true;
            setChecklist(newChecklist);
        }
        */
        console.log("BTScan");
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {checklist.map((item, index) => (
                    <CheckListItem
                        item={item}
                        index={index}
                        onValueChange={(index, newValue) => {
                            const newChecklist = [...checklist];
                            newChecklist[index].checked = newValue;
                            setChecklist(newChecklist);
                        }}
                        onChangeText={(index, newText) => {
                            const newChecklist = [...checklist];
                            newChecklist[index].text = newText;
                            setChecklist(newChecklist);
                        }}
                        onDelete={() => deleteCheckListItem(index, checklist, setChecklist)}
                    />
                ))}
                <Button title="Add Item" onPress={() => addCheckListItem(checklist, setChecklist)} />
            </View>
            <View style={styles.footer}>
                <Button title="Suggest" onPress={handleSuggest} />
                <Button title="Bluetooth" onPress={BTScan} />
            </View>
        </View>
    );
};

export default DetailScreen;
