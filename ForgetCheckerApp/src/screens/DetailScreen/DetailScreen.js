import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { 
    View,
    Button,
    Text,
    FlatList,
    PermissionsAndroid,
    NativeModules,} from 'react-native';
import HeaderTitleInput from '../../components/HeaderTitleInput'
import CheckListItem from '../../components/CheckListItem'
import styles from './DetailScreenStyles';
import GPTService from '../../services/GPTService';
import { loadNote, saveNote, deleteNote } from '../../utils/storageOperations';
import {loadUseSuggestion} from '../../utils/settingsOperations';
import { addCheckListItem, deleteCheckListItem} from '../../utils/checkListOperations';
import BleManager from 'react-native-ble-manager';
import BluetoothSerial from 'react-native-bluetooth-serial-next';


const DetailScreen = ({navigation, route}) => {
    if (!route.params || !route.params.note || !route.params.note.id) {
        console.error('NoteID is not provided');
        return null; 
    }
    

    const [useSuggestion, setUseSuggestion] = useState(false);

    const noteID = route.params.note.id.toString();
    const [noteName, setNoteName] = useState("");
    const [checklist, setChecklist] = useState([]);
    const [scannedDevices, setScannedDevices] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [scanning, setScanning] = useState(false);

    
    const handleSaveName = useCallback(
        (newName) => {
            setNoteName(newName);
        },[]
    );

    const handleSuggest = async () => {
        const suggestedItems = await GPTService.getSuggestions(noteName);
        setChecklist([...checklist, ...suggestedItems]);
    };

    const handleDelete = async() =>{
        deleteNote(noteID);
        navigation.goBack();
    }

    const handleSave = async() => {
        saveNote(noteID, noteName, checklist);
        navigation.goBack();
    }

    useEffect(() => {
        loadNote(noteID, setNoteName, setChecklist);
        loadUseSuggestion(setUseSuggestion);
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
                    <Button title="Save" onPress={handleSave} />
                    <Button title="Delete" onPress={handleDelete} color="red" />
                </View>
                ),
            });
    }, [navigation, checklist]);

    // BLE
    // Bluetoothスキャンのコールバック関数
    /*
    const handleDeviceScan = (error, device) => {
    if (error) {
        console.error('Error scanning devices:', error);
        return;
    }
    if (device.name) {
        // デバイス名がある場合、デバイスをスキャンリストに追加
        setScannedDevices((prevDevices) => [...prevDevices, device.name]);
    }
    };

    // スキャンを開始する関数
    const startScan = () => {
    setIsScanning(true);
    setScannedDevices([]); // スキャンを開始する前にリストをクリア

    console.log('Starting scan...');

    BleManager.scan([], 5, true).then(() => {
        console.log('Scanning...');
    });
    };

    // コンポーネントがマウントされたときにBluetoothスキャンを開始
    useEffect(() => {
    BleManager.start({ showAlert: false });

    // コンポーネントがアンマウントされたときにスキャンを停止
    return () => {
        BleManager.stopScan();
    };
    }, []);
    */

    // Bluetooth Classic
    useEffect(() => {
      BluetoothSerial.isEnabled().then((enabled) => {
        if (!enabled) {
          BluetoothSerial.enable().then(() => {
            console.log('Bluetooth is enabled');
          });
        }
        else {
            console.log("Bluetooth is already enabled");
        }
      });
  
      return () => {
        stopScan_BT();
      };
    }, []);
  
    const startScan_BT = () => {
        console.log("startScan_BT");
        setIsScanning(true);
        setScannedDevices([]);

        BluetoothSerial.discoverUnpairedDevices()
        .then((devices) => {
          const deviceNames = devices.map((device) => device.name);
          setScannedDevices(deviceNames);
          console.log("SetScannedDevice");
        })
        .catch((error) => {
          console.error('Error scanning devices:', error);
        });
    };
  
    const stopScan_BT = () => {
      setIsScanning(false);
    };

    const requestBluetoothPermission = async () => {
        console.log("requestBluetoothPermission");
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
              {
                title: 'Bluetooth Scan Permission',
                message: 'This app needs Bluetooth permission to scan for devices.',
                buttonPositive: 'OK',
              }
            );
        
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Bluetooth permission granted');
              // パーミッションが許可された場合の処理をここに記述
              startScan();
            } else {
              console.log('Bluetooth permission denied');
              // パーミッションが拒否された場合の処理をここに記述
            }
          } catch (err) {
            console.warn(err);
          }
      };
    
      const startScan = async () => {
        console.log("startScan");
        try {
          setScanning(true);
          console.log("unpairedDevices");
          const unpairedDevices = await BluetoothSerial.discoverUnpairedDevices();
          console.log("unpairedDevices-set");
          setDevices(unpairedDevices);
          setScanning(false);
        } catch (error) {
          console.error('Error scanning devices:', error);
          setScanning(false);
        }
        console.log("startScan end");
      };

    const BTScan = () => {
        setIsLoading(true);
        BleManager.getConnectedPeripherals([]).then((connectedDevices) => {
        setDevices(connectedDevices);
        setIsLoading(false);
        });
        /*
        useEffect(() => {
            BleManager.getConnectedPeripherals([]).then((connectedDevices) => {
              setDevicelist(connectedDevices);
              console.log("Connected peripherals: " + connectedDevices.length);
            });
          }, []);
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
    /*
                <Button title="BLEデバイスをスキャン" onPress={startScan} disabled={isScanning} />
                {isScanning && <Text>スキャン中...</Text>}
                <Text>Scanned Bluetooth Devices:</Text>
                <FlatList
                    data={scannedDevices}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                    <Text>{item}</Text>
                    )}
                />
    */

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {checklist.map((item, index) => (
                    <CheckListItem
                        key={index.toString()}    
                        item={item} 
                        index={index.toString()}
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
                <Button title="Bluetoothデバイスをスキャン開始" onPress={requestBluetoothPermission} disabled={scanning} />
                {scanning && <Text>スキャン中...</Text>}
                <Text>Scanned Bluetooth Devices:</Text>
                <FlatList
                data={scannedDevices}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text>{item}</Text>
                )}
                />
            </View>
            {useSuggestion && (
                <View style={styles.footer}>
                    <Button title="Suggest" onPress={handleSuggest} />
                </View>
            )}
        </View>
    );
};

export default DetailScreen;
