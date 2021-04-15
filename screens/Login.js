import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, ImageBackground, Button } from 'react-native'
import { Card, Avatar, Input, Icon, } from 'react-native-elements'
import firebase from '../database/firebase'


export default function Login(props) {
    const initialState = {
        email: '',
        password: ''
    }
    const [background, setBackground] = useState({
        uri: 'https://cdn.pixabay.com/photo/2021/03/21/13/36/boy-6112145_960_720.jpg'
    })
    const [state, setState] = useState(initialState)

    const handleOnChange = (name, value) => {
        setState({
            ...state,
            [name]: value
        })
    }



    const iniciarSesion = () => {

        const { email, password } = state

        if (firebase.auth.currentUser === null) {
            firebase.auth.signInWithEmailAndPassword(email, password)
                .catch((err) => Alert.alert(err.message))
        } else {
            firebase.auth.signInWithEmailAndPassword(email, password)
                .catch((err) => Alert.alert(err.message))
            props.navigation.navigate('Dispositivos')
        }

    }

    const registrarse = () => {
        const { email, password } = state
        firebase.auth.createUserWithEmailAndPassword(email, password)
            .catch((err) => Alert.alert(err.message))

    }


    return (

        <ImageBackground
            source={{ uri: background.uri }}
            style={Styles.backgroundImage}
        >
            <View style={Styles.CardContainer}>
                <Card containerStyle={Styles.CardContent}>
                    <View style={Styles.AvatarImg}>
                        <Avatar size="large" icon={{ name: 'user', type: 'font-awesome', color: 'white' }} />
                        <Text style={Styles.InputText}>Iniciar Sesión</Text>
                    </View>
                    <View style={Styles.InputContainer}>
                        <Input style={{color: 'white'}} placeholderTextColor={'white'} leftIcon={
                            <Icon
                                name='mail-outline'
                                type='ionicon'
                                size={24}
                                color='white'
                            />} onChangeText={(value) => handleOnChange('email', value)}
                            placeholder="Correo" />
                    </View>
                    <View style={Styles.InputContainer}>
                        <Input style={{color: 'white'}} placeholderTextColor={'white'} leftIcon={
                            <Icon
                                name='lock-closed-outline'
                                type='ionicon'
                                size={24}
                                color='white'
                            />}
                            name="Password" type='password' secureTextEntry={true}
                            onChangeText={(value) => handleOnChange('password', value)}
                            placeholder="Contraseña" />
                    </View>
                    <View style={Styles.ButtonContent}>
                    <View style={Styles.Button}>
                        <Button color='#39ac39' onPress={iniciarSesion} raised title="Iniciar Sesión" />
                    </View>
                    <View style={Styles.Button}>
                        <Button color='#db2f71' onPress={registrarse} raised title="Registrarse" />
                    </View>
                    </View>
                </Card>
            </View>
        </ImageBackground>

    )
}

const Styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        height: null,
        width: null,
        justifyContent: 'flex-start'
    },

    CardContainer: {
        height: '100%',
        justifyContent: 'center'
    },
    CardContent: {
        padding: 0,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        shadowColor: 'transparent'
        
    },
    Button: {
        marginTop: 5
    },
    ButtonContent: {
        padding: 25
    },
    InputText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    AvatarImg: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 50
    },
})