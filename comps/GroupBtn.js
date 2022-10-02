import React from 'react';
import { useTheme, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const GroupBtn = (props) => {

    const navigation = props.navi;
    const {colors} = useTheme();
    const styles = StyleSheet.create({
        btn: {
            padding: 10,
            borderRadius: 20,
            position: props.abs,
            top: props.top,
            left: props.left,
            backgroundColor: '#630358',
            width: 150,
            elevation: 5
        },
        text: {
            textAlign: 'center',
            fontSize: 16,
            color: colors.text
        }
    })

    return(
        <TouchableOpacity
            style={styles.btn}
            onPress={() => {
                navigation.navigate('CreateGroup')
            }}>
            <View>
                <Text style={styles.text}>New Group</Text>
            </View>
        </TouchableOpacity>
    )
}


export default GroupBtn;