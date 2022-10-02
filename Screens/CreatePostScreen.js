import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, TextInput, 
    StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Login from './LoginScreen';
import Nav from '../comps/Nav';
import { db } from '../backend/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from '../backend/firebase';

const CreatePostScreen = ({navigation, route}) => {

    const user = auth.currentUser;

    const [caption, setCaption] = useState(null);
    const nav = useNavigation();

    const id = route.params.id;
    const date = new Date();

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const today = mm + '/' + dd + '/' + yyyy;

    console.log(`Create Post: ${user.displayName}`);

    //CREATE posts
    const createPost = async () => {
        try {
            const newDoc = await addDoc(collection(db, `groups/${id}/posts`), {
                author: user.displayName,
                title: caption,
            });
            console.log(`created doc: ${newDoc.id}`);
        } catch (error) {console.log(error);}
    }

    //Conditional rendering based on auth state
    if (user) {
        return(
            <SafeAreaView style={styles.screen}>
                <View style={styles.formView}>
                    <Text style={{color: '#f70562', margin: 5}}>Discussion</Text>
                    <TextInput
                        style={styles.textfield}
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={(caption) => {
                            setCaption(prevCaption => prevCaption = caption)
                        }}
                    />
                    <TouchableOpacity 
                        style={styles.btn} 
                        onPress={async () => {
                            await createPost();
                            nav.goBack();
                        }}>
                        <Text style={styles.newPost}>submit</Text>
                    </TouchableOpacity>                
                </View>
                <Nav navi={navigation} style={styles.nav}/>
            </SafeAreaView>
        )
    } else {return <Login />}
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    formView: {
        flex: 1,
        margin: 10
    },
    textfield: {
        backgroundColor: 'black',
        textAlignVertical: 'top',
        borderWidth: 3,
        borderColor: "#482b54",
        color: 'grey',
        fontSize: 16,
        borderRadius: 10,
        padding: 5,
        margin: 10
    }, 
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
        fontSize: 18,
        color: '#f70562',
    },
    nav: {
        justifyContent: 'center',
        flex: 2
    },
})

export default CreatePostScreen;
