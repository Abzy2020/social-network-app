import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './Screens/HomeScreen';
import GroupScreen from './Screens/GroupScreen';
import UserScreen from './Screens/UserScreen';
import CreateGrpScreen from './Screens/CreateGroupScreen';
import ViewGroupScreen from './Screens/ViewGroupScreen';
import GroupSettingsScreen from './Screens/GroupSettingsScreen';
import CreatePostScreen from './Screens/CreatePostScreen';


const Stack = createNativeStackNavigator();

const AppTheme = {
  colors: {
    primary: 'rgb(120, 10, 120)',
    background: 'rgb(10, 10, 10)',
    card: '#240121',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(0, 0, 0)',
    notification: 'rgb(255, 69, 58)',
  },
};


const Search = () => {
  return(
    <TouchableOpacity>
      <Text style={{color: AppTheme.colors.text}}>Search</Text>
    </TouchableOpacity>
  );
};

const Settings = () => {
  return(
    <TouchableOpacity
      onPress={() => {

      }}
    >
      <Text style={{color: AppTheme.colors.text}}>Settings</Text>
    </TouchableOpacity>
  );
};

//TODO: CreatePost
const App = () => {
  return(
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Zybo" component={HomeScreen} />
        <Stack.Screen name="Groups" component={GroupScreen} />
        <Stack.Screen name='Group' component={ViewGroupScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGrpScreen} />
        <Stack.Screen name='CreatePost' component={CreatePostScreen} />
        <Stack.Screen name="GroupSettings" component={GroupSettingsScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
