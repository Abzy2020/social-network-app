import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Nav from '../comps/Nav';
import { auth } from '../backend/firebase';

const HomeScreen = ({navigation}) => {
    
    const user = auth.currentUser;

    try {
        console.log(`Home: ${user.displayName}`);
    } catch (error) {
        console.log(`Home: ${user}`);
    }
    
    user ? user.reload() : user;

    return(
        <SafeAreaView style={styles.screen}>
            <View style={styles.groups}>
            <Text style={{color: 'white'}}>{user}</Text>
            </View>
            <Nav navi={navigation} style={styles.nav}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    groups: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        flex: 2
    },
    nav: {
        justifyContent: 'center',
    }
})

export default HomeScreen;
