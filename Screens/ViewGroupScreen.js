import React, { useEffect, useState } from 'react';
import { SafeAreaView,Image, View, ScrollView, Text, 
    Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Post from '../comps/Post';
import PostBtn from '../comps/PostBtn';
import Nav from '../comps/Nav';
import { db } from '../backend/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { auth } from '../backend/firebase';

const ViewGroupScreen = ({navigation, route}) => {

    const user = auth.currentUser;

    const desc = route.params.desc;
    const name = route.params.name;
    const img = route.params.img;
    const id = route.params.id;
    
    const styleOne = {width: Dimensions.get('screen').width, height: 200};
    const styleTwo = {width: 0, height: 0};
    const style = img == 'https://mcdn.wallpapersafari.com/medium/78/15/sp4v6Q.jpg' ? styleTwo : styleOne;
    
    const [groupPosts, setGroupPosts] = useState([]);
    const nav = useNavigation();

    try {
        console.log(`Group: ${user.displayName}`);
    } catch (error) {
        console.log(`Group: ${user}`);
    }
    
    try {
        var posts = groupPosts.map((post) => {
            return(
                <Post 
                    author={post.author}
                    caption={post.title}
                    id={post.id}
                    groupId={id}
                    key={(post.author.length + post.title.length)/3}
                    navi={navigation}
                />
            )
        });
    } catch (error) {
        console.log('posts not available');
    }
    
    //read group posts
    const readPosts = async () => {
        try {
            const postsSnap = await getDocs(collection(db, `groups/${id}/posts`));
            let posts = [];
            postsSnap.forEach((doc) => {
                posts.push({...doc.data(), id: doc.id});
            })

            setGroupPosts(prevPosts => prevPosts = posts);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(groupPosts);

    useEffect(() =>{
        readPosts()
    }, []);

    if (groupPosts.length == 0) {
        return (
            <SafeAreaView style={styles.screen}>
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
                                nav.navigate('GroupSettings',{
                                    name: name,
                                    desc: desc,
                                    img: img,
                                    id: id
                                })}}>
                            {user ? <Text style={styles.settings}>settings</Text> : <View></View>}
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'center', flex: 2}}>
                        <ActivityIndicator size="large" color="#a83283"  style={styles.loadContainer}/>
                    </View>
                </View>
                {user ? 
                    <PostBtn
                        abs={styles.postBtn.position}
                        top={styles.postBtn.top}
                        left={styles.postBtn.left}
                        id={id}
                        navi={navigation}
                    />
                :
                    <View></View>}
                <Nav navi={navigation} style={styles.nav}/>
            </SafeAreaView>
        )
    } else {
        return (
        <SafeAreaView style={styles.screen}>
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
                            nav.navigate('GroupSettings',{
                                name: name,
                                desc: desc,
                                img: img,
                                id: id
                            })}}>
                        {user ? <Text style={styles.settings}>settings</Text> : <View></View>}
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {posts}
                </ScrollView>
            </View>
            {user ? 
                <PostBtn
                    abs={styles.postBtn.position}
                    top={styles.postBtn.top}
                    left={styles.postBtn.left}
                    id={id}
                    navi={navigation}
                />
            :
                <View></View>}
            <Nav navi={navigation} style={styles.nav}/>
        </SafeAreaView>
    );}
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
        top: Dimensions.get('window').height - 170,
        left: Dimensions.get('window').width - 170,
    },
    nav: {
        justifyContent: 'center',
    }
})

export default ViewGroupScreen;