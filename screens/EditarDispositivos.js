import React, { useEffect, useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, Alert } from 'react-native'
import { Avatar } from 'react-native-elements'
import firebase from '../database/firebase'
import fire from 'firebase'


export default function UsersDetailScreen(props) {
    const id = props.route.params.userId
    const initialState = [{
        name: '',
        namecpu: '',
        procesador: '',
        placamadre: '',
        ram: '',
        disco: '',
        timestamp: '',
    }]
    const [state, setState] = useState(initialState)

    const handleChangeText = (name, value)=> {
        setState({
            ...state,
            [name]: value
        })
    };


    const getUsersById = async () => {
        const dbRef = firebase.db.collection('Dispositivos').doc(id)
        const doc = await dbRef.get()
        const disp = doc.data();
        setState({ ...disp, id: id })
    }



    useEffect(() => {
        getUsersById()
    }, [])


    const DeletUsers = async () => {
        const dbRef = firebase.db.collection('Dispositivos').doc(id)
        await dbRef.delete()
        props.navigation.navigate('Dispositivos')
    }

    const ConfirmationDelet = ()=> { 

        Alert.alert('Remover Dispositivo', 'Seguro de que quiere eliminiar?',[
            {text: 'No', onPress: () => null},
            {text: 'Yes', onPress: () => DeletUsers()}
        ])
    }

    const UpdateUsers = async () => {
        const dbRef = firebase.db.collection('Dispositivos').doc(id)
        await dbRef.set({
            name: state.name,
            namecpu: state.namecpu,
            procesador: state.procesador,
            placamadre: state.placamadre,
            ram: state.ram,
            disco: state.disco,
            descripcion: state.descripcion,
            timestamp: fire.firestore.FieldValue.serverTimestamp(),
            user: firebase.auth.currentUser.email
        })
        setState(initialState)
        props.navigation.navigate('Dispositivos')
    }

    return (
        <ScrollView style={Styles.container}>
            <View style={Styles.AvatarImg}>
                <Avatar source={{ uri: 'https://reactnativeelements.com/img/avatar/avatar--photo.jpg' }} size="xlarge" rounded />
            </View>
            <View>
                <TextInput style={Styles.inputGroup} value={state.name} placeholder='Usuario' onChangeText={(value)=> handleChangeText('name', value)}/>
            </View>
            <View>
                <TextInput style={Styles.inputGroup} value={state.namecpu} placeholder='Nombre del Equipo'onChangeText={(value)=> handleChangeText('namecpu', value)}/>
            </View>
            <View>
                <TextInput style={Styles.inputGroup} value={state.procesador} placeholder='Procesador' onChangeText={(value) => handleChangeText('procesador', value)} />
            </View>
            <View>
                <TextInput style={Styles.inputGroup} value={state.placamadre} placeholder='Placamadre' onChangeText={(value) => handleChangeText('placamadre', value)} />
            </View>
            <View>
                <TextInput style={Styles.inputGroup} value={state.ram} placeholder='Ram'onChangeText={(value)=> handleChangeText('ram', value)}/>
            </View>
            <View>
                <TextInput style={Styles.inputGroup} value={state.disco} placeholder='Disco'onChangeText={(value)=> handleChangeText('disco', value)}/>
            </View>
            <View>
                <TextInput style={Styles.inputGroup} placeholder='Descripción' onChangeText={(value) => handleChangeText('descripcion', value)} />
            </View>
            <View style={Styles.Button}>
                <Button
                    color='#39ac39'
                    title='Actualizar'
                    onPress={() => UpdateUsers()}


                />
            </View>
            <View style={Styles.Button}>
                <Button
                    color='#db2f71'
                    title='Borrar'
                    onPress={() => ConfirmationDelet()}

                />
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
    AvatarImg: {
        display: 'flex',
        alignItems: 'center'
    },
    Button: {
        marginBottom: 5
    }
})