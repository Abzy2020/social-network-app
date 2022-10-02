import React, { useState, useEffect } from 'react';
import { useTheme, useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import Nav from '../comps/Nav';
import GroupTile from '../comps/GroupTile';
import GroupBtn from '../comps/GroupBtn';
import { db } from '../backend/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { auth } from '../backend/firebase';

const GroupScreen = ({navigation}) => {

    const user = auth.currentUser;

    try {
        console.log(`Groups: ${user.displayName}`);
    } catch (error) {
        console.log(`Groups: ${user}`);
    }

    const { colors } = useTheme();
    const [groups, setGroups] = useState([]);

    const nav = useNavigation();
    
    const tiles = groups.map((group) => {
        return(
            <GroupTile
                name={group.name}
                image={group.image}
                description={group.description}
                id={group.id}
                key={group.id}
                navi={navigation}
            />
        )
    })
  
    //read groups
    const showGroups = async() => {
        try {
            const q = await getDocs(collection(db, "groups"));
            let groupsArr = [];
            q.forEach((doc) => {
                groupsArr.push({...doc.data(), id: doc.id});
            })
            setGroups(groupsArr);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        showGroups();
    }, []);


    if (groups.length == 0) {
        return (
            <SafeAreaView style={styles.screen}>
                <ActivityIndicator size="large" color="#a83283"  style={styles.loadContainer}/>
                <Nav navi={navigation} style={styles.nav}/>
            </SafeAreaView>
        )
    } else {
        return(
            <SafeAreaView style={styles.screen}>
                <ScrollView>
                    <View style={styles.groups}>
                        {tiles}
                    </View>
                </ScrollView>
                {user ? 
                <GroupBtn abs={styles.btn.position} top={styles.btn.top} left={styles.btn.left} navi={navigation}/> 
                : 
                <View></View>}
                <Nav navi={navigation} style={styles.nav}/>
            </SafeAreaView>
        );
    };

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    groups: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        flex: 2
    },
    btn: {
        position: 'absolute',
        top: Dimensions.get('window').height - 170,
        left: Dimensions.get('window').width - 170,
    },
    nav: {
        justifyContent: 'center',
    },
    loadContainer: {
        justifyContent: 'center',
        flex: 1
    }
})

export default GroupScreen;