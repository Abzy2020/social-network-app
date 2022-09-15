import React, { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View, ActivityIndicator, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import db from '../backend/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Nav from '../comps/Nav';
import GroupTile from '../comps/GroupTile';
import GroupBtn from '../comps/GroupBtn';

const GroupScreen = ({navigation}) => {

    const { colors } = useTheme();
    const [groups, setGroups] = useState([]);
    
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
            console.log('cant get groups');
        }
    }
    
    useEffect(() => {
        showGroups();
    }, [groups]);


    if (groups.length == 0) {
        return (
            <SafeAreaView style={styles.screen}>
                <ActivityIndicator size="large" color="#a83283"  style={styles.loadContainer}/>
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
                <GroupBtn 
                    abs={styles.btn.position}
                    top={styles.btn.top}
                    left={styles.btn.left}
                    navi={navigation}
                />
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
        top: Dimensions.get('screen').height - 250,
        left: Dimensions.get('screen').width - 170,
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