import React, {useEffect} from 'react';

import {fcmService} from './src/Notification/FCMService';
import {localNotificationService} from './src/Notification/LocalNotificationoService';
import Paper from './src/theme/Paper';
import {StateProvider} from './src/contextStore/StateProvider';
import contextReducer, {initialState} from './src/contextStore/contextReducer';
import {alert} from './src/util/alert';

export default function App() {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister() {
      console.log('[App] onRegister: ', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };

      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      );

      alert(notify.title, notify.body, true, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify);
      alert(notify.title, notify.body, true, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }

    return () => {
      console.log('[App] unregister');
      fcmService.unRegister();
    };
  }, []);

  return (
    <StateProvider initialState={initialState} reducer={contextReducer}>
      <Paper />
    </StateProvider>
  );
}
