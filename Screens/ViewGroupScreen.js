import React, { useEffect, useState } from 'react';
import { SafeAreaView,Image, View, ScrollView, Text, 
    Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Post from '../comps/Post';
import PostBtn from '../comps/PostBtn';
import Nav from '../comps/Nav';
import db from '../backend/firebase';
import { doc, getDoc, collection } from 'firebase/firestore';


const ViewGroupScreen = ({navigation, route}) => {

    
    const desc = route.params.desc;
    const name = route.params.name;
    const img = route.params.img;
    const id = route.params.id;
    
    const styleOne = {width: Dimensions.get('screen').width, height: 200};
    const styleTwo = {width: 0, height: 0};
    const style = img == 'https://mcdn.wallpapersafari.com/medium/78/15/sp4v6Q.jpg' ? styleTwo : styleOne;
    
    const [groupPosts, setGroupPosts] = useState([]);
    
    try {
        var posts = groupPosts.map((post) => {
            return(
                <Post 
                author={post.author}
                caption={post.caption}
                key={(post.author.length + post.caption.length)/3}
                />
                )
            });
    } catch (error) {
        console.log('posts not available');
    }
    
    //read group posts
    const readPosts = async () => {
        try {
            const postsRef = doc(db, 'groups', id);
            const postsSnap = await getDoc(postsRef);

            setGroupPosts(prevPosts => prevPosts = postsSnap.data().posts);
        } catch (error) {
            console.log('cant retrieve posts');
        }
    }

    useEffect(() =>{
        readPosts()
    }, []);

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView>
                <View style={styles.content}>
                    <Image
                        style={style}
                        source={{
                            uri: img
                        }}
                    />
                    <View style={styles.groupInfo}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.text}>{desc}</Text>
                        <TouchableOpacity 
                            style={{padding: 5, paddingLeft: 0}}
                            onPress={()=>{
                                navigation.navigate('GroupSettings',{
                                    name: name,
                                    desc: desc,
                                    img: img,
                                    id: id
                                })}}>
                            <Text style={styles.settings}>
                                settings
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {posts}
                    </View>
                </View>
            </ScrollView>
                    <PostBtn
                        abs={styles.postBtn.position}
                        top={styles.postBtn.top}
                        left={styles.postBtn.left}
                        navi={navigation}
                    />
            <Nav navi={navigation} style={styles.nav}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    content: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        flex: 2
    },
    groupInfo: {
        padding: 10,
        backgroundColor: '#240121',
    },
    title: {
        color: '#c9c9c9',
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginLeft: 10
    },
    text: {
        color: '#c9c9c9',
        marginLeft: 10
    },
    settings: {
        color: '#f73b58',
        marginLeft: 10
    },
    btn: {
        backgroundColor: '#c9c9c9',
    },
    postBtn: {
        position: 'absolute',
        top: Dimensions.get('screen').height - 250,
        left: Dimensions.get('screen').width - 170,
    },
    nav: {
        justifyContent: 'center',
    }
})

export default ViewGroupScreen;