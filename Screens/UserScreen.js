import React from 'react';
import {SafeAreaView, View, TouchableHighlight, Text, StyleSheet, ScrollView} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Nav from '../comps/Nav';

const UserScreen = ({navigation}) => {

    const { colors } = useTheme();

    return(
        <SafeAreaView style={styles.screen}>
            <ScrollView>
                <View style={styles.groups}>

                </View>
            </ScrollView>
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

export default UserScreen;