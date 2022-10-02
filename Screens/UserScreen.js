import React, { useEffect, useState } from 'react';
import {SafeAreaView, View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import Nav from '../comps/Nav';
import SignUpScreen from './SignUpScreen'
import { auth } from '../backend/firebase';
import { signOut } from 'firebase/auth';

const UserScreen = ({navigation, route}) => {

    const nav = useNavigation();
    const user = auth.currentUser;

    try {console.log(`Profile: ${user.displayName}`);} 
    catch (error) {console.log(`Profile: ${user}`);}
    
    user ? user.reload() : user;

    if (user){
        return(
            <SafeAreaView style={styles.screen}>
                <View style={styles.groups}>
                    <Text style={styles.title}>{user.displayName}</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={async () => {
                            await signOut(auth);
                            nav.navigate('Zybo');
                        }}>
                        <Text style={{color: 'white', textAlign: 'center'}}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                <Nav navi={navigation} style={styles.nav}/>
            </SafeAreaView>
        );
    } else {
        return <SignUpScreen />
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    title: {
        color: '#f70562',
        fontSize: 30,
        fontWeight: 'bold',
        margin: 15
    },
    groups: {
        flex: 1
    },
    logoutBtn: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#630358',
        margin: 15,
        width: 125,
        elevation: 5,
        marginLeft: 'auto',
    },
    nav: {
        justifyContent: 'center',
    }
})

export default UserScreen;
