import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import AboutScreen from "../screens/AboutScreen";
import SupportScreen from "../screens/client/SupportScreen";
import AccountScreen from '../screens/client/AccountScreen';
import LocationScreen from '../screens/client/LocationScreen';
import ServicesScreen from '../screens/client/ServicesScreen';
import SignOutScreen from '../screens/auth/SignOutScreen';
import ClientProfileNavigation from './ClientProfileNavigation';
import MessagingNavigation from './MessagingNavigation';
import ChatScreen from '../screens/messaging/ChatScreen';
import GoHomeButton from '../screens/client/GoHomeButton';
import ClientHomeStackNavigator from "./ClientHomeStackNavigator";
import MainHeader from '../components/MainHeader';
import NestedHeader from '../components/NestedHeader';

const ClientDrawer = createDrawerNavigator();
const AboutStack = createStackNavigator();
const SupportStack = createStackNavigator();

const mainHeaderStyle = {
  backgroundColor: "#092455",
  height: 100
}

const AboutNavigation = () => {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen
        name='About'
        component={AboutScreen}
        options={{
          headerTitle: () => <MainHeader />,
          headerStyle: mainHeaderStyle
        }}
      />
    </AboutStack.Navigator>
  )
}

const SupportNavigation = () => {
  return (
    <SupportStack.Navigator>
      <SupportStack.Screen
        name='Support'
        component={SupportScreen}
        options={{
          headerTitle: () => <MainHeader />,
          headerStyle: mainHeaderStyle
        }}
      />
    </SupportStack.Navigator>
  )
}

const ClientNavigation = () => {

  return (
    <ClientDrawer.Navigator initialRouteName="ClientHomeStackNavigator" drawerPosition='right' >
      <ClientDrawer.Screen
        name="ClientHomeStackNavigator"
        component={ClientHomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <ClientDrawer.Screen
        name='About'
        component={AboutNavigation}
      />
      <ClientDrawer.Screen
        name='Support'
        component={SupportNavigation}
      />
      <ClientDrawer.Screen
        name='ClientProfileNavigation'
        component={ClientProfileNavigation}
        options={{ title: 'Public Profile' }}
      />
      <ClientDrawer.Screen
        name='Messages'
        component={MessagingNavigation}
      />
      <ClientDrawer.Screen
        name="Sign Out"
        component={SignOutScreen}
      />
    </ClientDrawer.Navigator>
  );
};

export default ClientNavigation;
