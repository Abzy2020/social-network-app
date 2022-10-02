import React from 'react';
import { useTheme, useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

const Nav = (props) => {

    const navigation = useNavigation();
    const {colors} = useTheme();
    const styles = StyleSheet.create({
        nav: {
            backgroundColor: colors.card,
            flexDirection: 'row',
            justifyContent: 'center',
            elevation: 5
        },
        text: {
            fontSize: 16,
            color: colors.text,
            marginLeft: 30,
            marginRight: 30,
        },
        highlight: {
            padding: 15,
        }
    });

    return(
        <View style={styles.nav}>
            <TouchableHighlight 
                style={styles.highlight}
                onPress={() => navigation.navigate('Zybo')}>
                <Text style={styles.text}>Home</Text>
            </TouchableHighlight>

            <TouchableHighlight 
                style={styles.highlight}
                onPress={() => navigation.navigate("Groups")}>
                <Text style={styles.text}>Groups</Text>
            </TouchableHighlight>

            <TouchableHighlight 
                style={styles.highlight}
                onPress={()=> navigation.navigate('User')}>
                <Text style={styles.text}>Profile</Text>
            </TouchableHighlight>
        </View>
    )
}


export default Nav;