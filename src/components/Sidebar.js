import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './Home';
import CustomDrawer from '../common/CustomDrawer';

const Drawer = createDrawerNavigator();

function Sidebar() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

export default Sidebar;
