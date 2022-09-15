import React, {useState} from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import db from '../backend/firebase';
import { getDoc, updateDoc, doc } from 'firebase/firestore';

const CreatePostScreen = ({navigation, route}) => {

    const [caption, setCaption] = useState(null);

    const id = route.params.id;
    const date = new Date();

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const today = mm + '/' + dd + '/' + yyyy;

    //update posts arrays
    const createPost = async () => {
        const postRef = doc(db, 'groups', id);
        const group = await getDoc(postRef);

        const newPosts = group.data().posts.push({
            author: 'dxgma',
            caption: caption,
            date: today
        });

        await updateDoc(postRef, newPosts);
    }

    return(
        <SafeAreaView>
            <View>
                <TextInput
                    onChangeText={(caption) => {
                        setCaption(prevCaption => prevCaption = caption)
                    }}
                />
                <TouchableOpacity 
                    style={styles.btn} 
                    onPress={async () => {
                        await createPost();
                        navigation.navigate('Groups');
                    }}>
                    <Text style={styles.newPost}>submit</Text>
                </TouchableOpacity>                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        width: Dimensions.get('screen').width/3,
        textAlign: 'center',
        borderRadius: 8,
        margin: 10,
        backgroundColor: '#482b54',
    },
    newPost: {
        textAlign: 'center',
        fontSize: 20,
        color: '#f70562',
    },
})

export default CreatePostScreen;