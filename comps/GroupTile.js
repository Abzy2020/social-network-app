import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';


const GroupTile = (props) => {

    const navigation = useNavigation();
    const [image, setImage] = useState(props.image);
    const name = props.name;
    const description = props.description;
    const id = props.id

    if (image == ''){
        setImage(prevImage => prevImage = 'https://mcdn.wallpapersafari.com/medium/78/15/sp4v6Q.jpg')
    }

    return(
        <TouchableOpacity
            onPress={() => {
                console.log('moving to viewgroup screen');
                navigation.navigate('Group', {
                    img: image,
                    name: name,
                    desc: description,
                    id: id
                });
            }}>
            <ImageBackground 
                style={styles.tile}
                source={{
                    uri: image
                }}
                >
                <Text style={styles.text}>{name}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tile: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height/3,
        marginBottom: 3,
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'black',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        textShadowRadius: 20,
        textShadowColor: 'black',
        elevation: 5
    }
})

export default GroupTile;