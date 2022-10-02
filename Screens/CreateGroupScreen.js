import React, {useState} from 'react';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Text, SafeAreaView, ScrollView, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Nav from '../comps/Nav';
import { db } from '../backend/firebase';
import { addDoc, collection } from 'firebase/firestore';

const CreateGrpScreen = ({navigation}) => {

    const {colors} = useTheme();
    const nav = useNavigation();

    const [groupName, setGroupName] = useState(null);
    const [groupDesc, setGroupDesc] = useState('');
    const [imgString, setImgString] = useState('');

    //create Group 
    const createGroup = async () => {
        try {
            if (groupName == null || '') {console.log('must have a group name');} 
            else{
                const newDoc = await addDoc(collection(db, 'groups'), {
                    name: groupName,
                    description: groupDesc,
                    image: imgString
                });
                console.log(`created doc: ${newDoc.id}`);
            }
        } catch (error) {console.log(error);}
    };

    return(
        <SafeAreaView style={styles.screen}>
            <ScrollView style={styles.formView}>
                <Text style={{color: colors.text, marginTop: 20, marginBottom: 10}}>Name</Text>
                <TextInput 
                    style={styles.name}
                    placeholder='Name'
                    onChangeText={text => {setGroupName(text);}} />
                <Text style={{color: colors.text, marginTop: 20}}>Description</Text>
                <TextInput 
                    placeholder='description'
                    multiline={true}
                    numberOfLines={10}
                    style={styles.desc}
                    onChangeText={text => {setGroupDesc(text)}} />
                <Text style={{color: colors.text, marginTop: 20}}>image url</Text>
                <TextInput 
                    placeholder='image url'
                    multiline={true}
                    numberOfLines={4}
                    style={styles.desc}
                    onChangeText={text => {setImgString(text)}} />
                <View style={styles.btnHolder}>
                    <TouchableOpacity style={styles.btn}
                        onPress={async () => {
                            await createGroup();
                            nav.navigate('Groups');
                        }}>
                        <Text style={styles.text}>create</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Nav navi={navigation} style={styles.nav}/>
        </SafeAreaView>
    )
};

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
        width: 150,
        textAlign: 'center',
        borderRadius: 8,
        margin: 10,
        backgroundColor: '#482b54',
    },
    btnHolder: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
    },
    nav: {
        justifyContent: 'center',
        flex: 2
    },
});

export default CreateGrpScreen;
