import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, Alert } from 'react-native'
import firebase from '../database/firebase'
import fire from 'firebase'
import { Avatar } from 'react-native-elements'


export default function CreateUsersScreen(props) {

    const [state, setState] = useState({
        name: '',
        namecpu: '',
        placamadre: '',
        procesador: '',
        ram: '',
        disco: '',
    })
    const handleChangeText = (name, value) => {
        setState({
            ...state,
            [name]: value
        })
    };

    const SaveNewUsers = async () => { 
        if (state. name === '') {
            Alert.alert('Ingrese un Nombre')
        }
        else {
            await firebase.db.collection('Dispositivos').add({
                name: state.name,
                namecpu: state.namecpu,
                procesador: state.procesador,
                placamadre: state.placamadre,
                ram: state.ram,
                disco: state.disco,
                timestamp: fire.firestore.FieldValue.serverTimestamp(),
                descripcion: '',
                user: firebase.auth.currentUser.email
            })
            alert('Guardado!')
            props.navigation.navigate('Dispositivos')
        }

    }

    return (
        <ScrollView style={Styles.container}>
            <View style={Styles.AvatarImg}>
                <Avatar
                    size="xlarge"
                    rounded
                    source={{
                        uri:
                            'https://reactnativeelements.com/img/avatar/avatar--photo.jpg',
                    }}
                />
            </View>
            <View>
                <TextInput style={Styles.inputGroup} placeholder='Usuario' onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View>
                <TextInput style={Styles.inputGroup} placeholder='Nombre del Equipo' onChangeText={(value) => handleChangeText('namecpu', value)} />
            </View>
            <View>
                <TextInput style={Styles.inputGroup} placeholder='Procesador' onChangeText={(value) => handleChangeText('procesador', value)} />
            </View>
            <View>
                <TextInput style={Styles.inputGroup} placeholder='Placamadre' onChangeText={(value) => handleChangeText('placamadre', value)} />
            </View>
            <View>
                <TextInput style={Styles.inputGroup} placeholder='Ram' onChangeText={(value) => handleChangeText('ram', value)} />
            </View>
            <View>
                <TextInput style={Styles.inputGroup} placeholder='Disco' onChangeText={(value) => handleChangeText('disco', value)} />
            </View>
            <View>
                <TextInput style={Styles.inputGroup} placeholder='Descripción' onChangeText={(value) => handleChangeText('descripcion', value)} />
            </View>
            <View style={Styles.Buttom}>
                <Button title='Guardar Datos' onPress={() => SaveNewUsers()} />
            </View>
        </ScrollView>
    )
}

const Styles = StyleSheet.create({
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'

    },
    container: {
        flex: 1,
        paddingHorizontal: 35,
        paddingTop: 20
    },
    Buttom: {
        marginTop: 10
    },
    AvatarImg: {
        display: 'flex',
        alignItems: 'center'
    },
})