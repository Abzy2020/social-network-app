import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Comment = (props) => {

    const {colors} = useTheme();

    const author = props.author;
    const caption = props.caption;

    const styles = StyleSheet.create({
        post: {
            backgroundColor: '#141414',
            padding: 5,
            marginTop: 4,
        },
        info: {
            color: colors.text,
            fontSize: 18,
            margin: 5
        },
        content: {
            color: colors.text,
            fontSize: 16,
            margin: 5
        }
    });

    return(
        <TouchableOpacity style={styles.post}>
            <View>
                <Text style={styles.info}>{ author }</Text>
            </View>
            <View>
                <Text style={styles.content}>
                    { caption }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Comment;