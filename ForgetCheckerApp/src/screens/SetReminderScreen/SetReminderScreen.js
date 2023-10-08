import React, { useState, useEffect } from 'react';
import { View, Button, Text, Linking } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PushNotification from 'react-native-push-notification';
import useDatePicker from '../../components/useDatePicker';
import { scheduleNotification, cancelNotification } from '../../utils/notificationManager';
import styles from './SetReminderScreenStyles';

const SetReminderScreen = ({ route }) => {
    const [date, setDate] = useState(new Date());
    const { isDatePickerVisible, showDatePicker, hideDatePicker } = useDatePicker();

    const handleConfirm = (date) => {
        hideDatePicker();
        setDate(date);
        scheduleNotification(`Reminder for ${route.params.note.name}`, date, { id: route.params.note.id });

        PushNotification.localNotification({
            channelId: "channel-id",
            message: "Test Notification",
        });
    };

    const handleCancel = () => {
        cancelNotification(route.params.note.id);
    };

    return (
        <View style={styles.container}>
            <Button title="Set Reminder" onPress={showDatePicker} />
            <Button title="Cancel Reminder" onPress={handleCancel} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                is24Hour={true}
            />
            <Text style={styles.reminderText}>Reminder set for: {date.toLocaleString()}</Text>
        </View>
    );
};

export default SetReminderScreen;

