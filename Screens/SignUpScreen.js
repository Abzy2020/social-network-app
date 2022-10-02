import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity,
     StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Nav from '../comps/Nav';
import { auth } from '../backend/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


const SignUpScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const nav = useNavigation();

    const user = auth.currentUser;

     
    try {
        console.log(`Sign Up: ${user.displayName}`);
    } catch (error) {
        console.log(`Sign Up: ${user}`);
    }

     
    //Register User
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {displayName: username});
            console.log(user);
        } catch (error) {console.log(error)}
    }

    
    return(
     <SafeAreaView style={styles.screen}>
        <View style={styles.formView}>
            <Text style={styles.title}> Create Account </Text>
            <TextInput
                style = {styles.textfield}
                placeholder='email'
                placeholderTextColor={'grey'}
                onChangeText={(text) => {
                    setEmail(prevText => prevText = text);
                }} />
            <TextInput
                style = {styles.textfield}
                placeholder='username'
                placeholderTextColor={'grey'}
                onChangeText={(text) => {
                    setUsername(prevText => prevText = text);
                }} />
            <TextInput
                style = {styles.textfield}
                placeholder='password'
                placeholderTextColor={'grey'}
                onChangeText={(text) => {
                    setPassword(prevText => prevText = text);
                }} />
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=> {nav.navigate('Login');}}>
                    <Text style={styles.haveAcc}>Already have an account?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} 
                    onPress={async ()=> {
                        try {
                            await register();
                            nav.navigate('User');
                        } catch (error) {console.log(error);}
                    }}>
                    <Text style={styles.text}> Sign Up</Text>
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


export default SignUpScreen;
