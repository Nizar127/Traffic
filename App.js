import 'react-native-gesture-handler';
import React from 'react';
//import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import {Container, Button} from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EditProfileJobSeeker from './job_seeker/screens/EditProfileJobSeeker';
import JobSeekerDetail from './job_seeker/screens/JobSeekerDetail';
import Profile from './job_seeker/screens/Profile';
import Feed from './job_seeker/screens/Feed';
import SplashScreen from './SplashScreen';
import Login from './job_seeker/Auth/Login';
import SignUp from './job_seeker/Auth/SignUp';
import UserProfile from './job_seeker/screens/UserProfile';
import Search from './job_seeker/screens/Search';
import Home from './job_seeker/Home'
import FeedDetail from './job_seeker/screens/FeedDetail';
import TestAuth from './job_seeker/Auth/test';
import SubmittedHiring from './job_seeker/screens/SubmittedHiring';
import SuccessHiring from './job_seeker/screens/SuccessHiring';

import SuccessHiringDetails from './job_seeker/screens/SuccessHiringDetails';
import MyHiringDetail from './job_seeker/screens/MyHiringDetail';

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splashscreen" component={SplashScreen}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Feed" component={Feed}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="TestAuth" component={TestAuth}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="MyHiringDetail" component={MyHiringDetail}/>
      
        <Stack.Screen name="SuccessHiring" component={SuccessHiring}/>
        <Stack.Screen name="SubmittedHiring" component={SubmittedHiring}/>
        <Stack.Screen name="SuccessHiringDetails" component={SuccessHiringDetails}/>
        <Stack.Screen name="EditProfileJobSeeker" component={EditProfileJobSeeker}/>
        <Stack.Screen name="JobSeekerDetail" component={JobSeekerDetail}/>
        <Stack.Screen name="FeedDetail" component={FeedDetail}/>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="UserProfile" component={UserProfile}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
export default App;


const Style = StyleSheet.create({
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 220,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
},
})
