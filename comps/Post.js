import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Post = (props) => {

    const {colors} = useTheme();

    const styles = StyleSheet.create({
        post: {
            backgroundColor: '#4a0116',
            margin: 10,
            borderRadius: 5
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
                <Text style={styles.info}>{props.author}</Text>
            </View>
            <View>
                <Text style={styles.content}>{props.caption}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Post;