import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Icons} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from './screens/Feed';
import Profile from './screens/Profile';
import Search from './screens/Search';
import SuccessHiring from './screens/SuccessHiring';
import { Ionicons } from '@expo/vector-icons';


export default function Home() {
    return (

        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({  color, size }) => {
            if (route.name === 'Feed') {
              return (
                <Ionicons
                  name={'md-home-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Search') {
              return (
                <Ionicons
                  name={'md-search-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'SuccessHiring') {
              return (
                <Ionicons
                  name={'md-briefcase-outline'}
                  size={size}
                  color={color}
                />
              );
            } 
            else if (route.name === 'Profile'){
              <Ionicons
                  name={'md-person'}
                  size={size}
                  color={color}
                />
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
        >
          <Tab.Screen name="Feed" component={Feed} />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="SuccessHiring" component={SuccessHiring} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>

    );
  }
  
  const Tab = createBottomTabNavigator();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  