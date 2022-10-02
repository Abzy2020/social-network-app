import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, TextInput,
    TouchableOpacity, StyleSheet, Text } from 'react-native';
import Nav from '../comps/Nav';
import Comment from '../comps/Comment';
import { db } from '../backend/firebase';
import { addDoc, getDocs, collection } from 'firebase/firestore';
import { auth } from '../backend/firebase';


const ViewPostScreen = ({navigation, route}) => {

    const user = auth.currentUser;

    const [commentsList, setCommentsList] = useState([]);
    const [replyComment, setReplyComment] = useState();

    const author = route.params.author;
    const caption = route.params.caption;
    const id = route.params.id;
    const groupId = route.params.groupId;

    console.log(id);
    console.log(groupId);

    try {
        var comments = commentsList.map((post) => {
            return(
                <Comment 
                    author={post.author}
                    caption={post.title}
                    key={(post.author.length + post.title.length)/3}
                    navi={navigation}
                />
            )
        });
    } catch (error) {console.log('comments not available');}

    //read post comments
    const readComments = async () => {
        try {
            const commentsSnap = await getDocs(collection(db, `groups/${groupId}/posts/${id}/comments`));
            let comments = [];
            commentsSnap.forEach((doc) => {
                comments.push({...doc.data(), id: doc.id});
            })

            setCommentsList(prevComments => prevComments = comments);
        } catch (error) {console.log(error);}
    }
    console.log(commentsList);

    //create comment under post
    const createComment = async () => {
        try {
            const newDoc = await addDoc(collection(db, `groups/${groupId}/posts/${id}/comments`), {
                author: user.displayName,
                title: replyComment,
            });
            console.log(`created doc: ${newDoc.id}`);
        } catch (error) {console.log(error);}
    }

    useEffect(() =>{readComments();}, []);

    return(
        <SafeAreaView style={styles.screen}>
            <View style={styles.content}>
                <Text style={styles.title}>{author}</Text>
                <Text style={styles.text}>{caption}</Text>
                {user ? <View style={{flexDirection: 'row'}}>
                    <TextInput
                        style={styles.replyField}
                        placeholder={'reply'}
                        placeholderTextColor={'grey'}
                        onChangeText={(text)=> {
                            setReplyComment(prevReplyComment => prevReplyComment = text)
                        }}/>
                    <TouchableOpacity style={styles.submitBtn}
                        onPress={createComment}>
                        <Text style={styles.submitBtnText}>reply</Text>
                    </TouchableOpacity>
                </View>
                :
                <View></View>}
            </View>
            <ScrollView>
                {comments}
            </ScrollView>
            <Nav navi={navigation} style={styles.nav}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20,
        margin: 5
    },
    replyField: {
        backgroundColor: '#101010',
        borderBottomWidth: 3,
        borderColor: '#3a0430',
        color: 'white',
        marginTop: 15,
        flex: 1
    },
    submitBtn: {
        backgroundColor: '#6a0430',
        justifyContent: 'center',
        marginTop: 15,
        flex: 0.2
    }, 
    submitBtnText: {
        color: 'white',
        textAlign: 'center',
    },
    content: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#141414',
        padding: 10,
    },
    nav: {
        justifyContent: 'center',
    }
})

export default ViewPostScreen;
