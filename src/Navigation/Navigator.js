import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTabNavigation from '../components/BottomTabNavigation';
import SignIn from '../components/SignIn';
import UserDetails from '../components/UserDetails';
import InitialLoader from '../components/InitialLoader';

const Stack = createStackNavigator();

export default function Navigator({initialRoute}) {
  const config = {
    headerShown: false,
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="Initial" component={InitialLoader} options={config} />
      <Stack.Screen name="SignIn" component={SignIn} options={config} />
      <Stack.Screen
        name="Home"
        component={BottomTabNavigation}
        options={config}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetails}
        options={config}
      />
    </Stack.Navigator>
  );
}
