import React from 'react';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const PostBtn = (props) => {

    const navigation = props.navi;
    const {colors} = useTheme();
    const styles = StyleSheet.create({
        btn: {
            padding: 10,
            borderRadius: 8,
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
                navigation.navigate('CreatePost', {
                    id: props.id
                })
            }}>
            <View>
                <Text style={styles.text}>compose</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PostBtn;