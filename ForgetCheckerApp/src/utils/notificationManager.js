import PushNotification from 'react-native-push-notification';

const scheduleNotification = (message, date, userInfo) => {
    const now = new Date();
    const offset = -(now.getTimezoneOffset() / 60);
    const japanOffset = 9;
    const diff = japanOffset - offset;
    const japanDate = new Date(date.getTime() + diff * 60 * 60 * 1000);
    
    PushNotification.localNotificationSchedule({
        message: message,
        date: japanDate,
        userInfo: userInfo,
        repeatType: 'day',
        soundName: 'default',
        channelId: "channel-id",  
    });
    console.log('Notification scheduled:', japanDate);
};

const cancelNotification = (id) => {
    PushNotification.cancelLocalNotifications({ id });
    console.log('Notification cancelled:', id);
};

export {
    scheduleNotification,
    cancelNotification,
};
