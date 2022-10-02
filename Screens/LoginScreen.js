import React, { useState } from 'react';
import { SafeAreaView, View, Text, 
    TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from '../comps/Nav';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../backend/firebase';


const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nav = useNavigation();

    //TODO: Sign In User
    const signIn = async() => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log('could not log in');
            console.log(error);
        }
    }

    return(
     <SafeAreaView style={styles.screen}>
        <View style={styles.formView}>
            <Text style={styles.title}> Sign In </Text>
            <TextInput
                style = {styles.textfield}
                placeholder='email'
                placeholderTextColor={'grey'}
                onChangeText={(text) => {
                    setEmail(prevText => prevText = text);
                }} />
            <TextInput
                style = {styles.textfield}
                placeholder='password'
                placeholderTextColor={'grey'}
                onChangeText={(text) => {
                    setPassword(prevText => prevText = text);
                }} />
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.haveAcc}>Already have an account?</Text>
                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.text}
                        onPress={async ()=> {
                            await signIn();
                            nav.navigate('User');
                        }}>
                            Login
                        </Text>
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
    title: {
        color: '#f70562',
        fontSize: 25,
        fontWeight: 'bold'
    },
    formView: {
        flex: 1,
        margin: 10,
    },
    textfield: {
        backgroundColor: 'black',
        textAlignVertical: 'center',
        borderWidth: 3,
        borderColor: "#482b54",
        color: 'white',
        fontSize: 16,
        borderRadius: 10,
        padding: 5,
        margin: 10
    }, 
    haveAcc: {
        padding: 10,
        color: '#f70562',
    },
    btn: {
        padding: 10,
        width: Dimensions.get('screen').width/3,
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 10,
        marginLeft: 'auto',
        backgroundColor: '#482b54',
    },
    text: { 
        color: 'white',
        textAlign: 'center'
    },
    nav: {
        justifyContent: 'center',
        flex: 2
    },
})

export default LoginScreen;