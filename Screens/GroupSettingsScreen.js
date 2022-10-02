import { useTheme, useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { db } from '../backend/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Nav from '../comps/Nav';

const GroupSettingsScreen = ({navigation, route}) => {

    const {colors} = useTheme();

    const [groupName, setGroupName] = useState(route.params.name);
    const [groupDesc, setGroupDesc] = useState(route.params.desc);
    const [imgString, setImgString] = useState(route.params.img);
    const id = route.params.id;
    const nav = useNavigation();

    //Update Group fields
    const updateGroup = async () => {
        let groupRef = doc(db, 'groups', id);
        await updateDoc(groupRef, {
            name: groupName,
            description: groupDesc,
            image: imgString
        });
    };

    //Delete Group
    const deleteGroup = async () => {
        let groupRef = doc(db, 'groups', id);
        await deleteDoc(groupRef);
    }

    return(
        <SafeAreaView style={styles.screen}>
            <View style={styles.formView}>
                <Text style={{color: colors.text, marginTop: 20, marginBottom: 10}}>Name</Text>
                <TextInput 
                    style={styles.name}
                    value={groupName}
                    placeholder='Name'
                    onChangeText={text => {
                        setGroupName(text);
                    }} />
                <Text style={{color: colors.text, marginTop: 20}}>Description</Text>
                <TextInput 
                    placeholder='description'
                    multiline={true}
                    numberOfLines={10}
                    style={styles.desc}
                    value={groupDesc}
                    onChangeText={text => {
                        setGroupDesc(text)
                    }} />
                <TextInput 
                        placeholder='image url'
                        multiline={true}
                        numberOfLines={4}
                        style={styles.desc}
                        value={imgString}
                        onChangeText={text => {
                            setImgString(text)
                        }} />
                <View style={styles.btnHolder}>
                    <TouchableOpacity 
                        style={styles.btn} 
                        onPress={async () => {
                            await deleteGroup();
                            nav.navigate('Groups');
                        }}>
                        <Text style={styles.delText}>delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.btn} 
                        onPress={async () => {
                            await updateGroup();
                            nav.navigate('Groups');
                        }}>
                        <Text style={styles.text}>edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Nav navi={navigation} style={styles.nav}/>
        </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    formView: {
        flex: 1,
        margin: 10
    },
    name: {
        backgroundColor: 'black',
        borderWidth: 3,
        borderColor: "#482b54",
        color: 'grey',
        fontSize: 16,
        borderRadius: 10,
        padding: 5,
        margin: 10
    },
    desc: {
        backgroundColor: 'black',
        textAlignVertical: 'top',
        borderWidth: 3,
        borderColor: "#482b54",
        color: 'grey',
        fontSize: 16,
        borderRadius: 10,
        padding: 5,
        margin: 10,

    },
    btn: {
        padding: 10,
        width: Dimensions.get('screen').width/3,
        textAlign: 'center',
        borderRadius: 8,
        margin: 10,
        backgroundColor: '#482b54',
    },
    btnHolder: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
    },
    delText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#f70562',
    },
    nav: {
        justifyContent: 'center',
        flex: 2
    },
});

export default GroupSettingsScreen;