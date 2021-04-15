import React, { useEffect, useState } from 'react'
import { ScrollView, Button, View, StyleSheet } from 'react-native'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'


export default function CreateUsersScreen(props) {
    const [state, setState] = useState([])

    useEffect(() => {
        firebase.db.collection('Dispositivos').onSnapshot(querySnapshot => {
            const dispositivos = [];
            querySnapshot.docs.forEach(doc => {
                const { name, namecpu, ram, disco } = doc.data();
                dispositivos.push({
                    id: doc.id,
                    name,
                    namecpu,
                    ram,
                    disco
                });
            });
            setState(dispositivos)
        })
    }, [])



    return (
        <View style={Styles.Container}>
            <ScrollView style={Styles.UsersList}>
                {
                    state.map((dispositivo) => {
                        return (
                            <ListItem style={Styles.ListItem} key={dispositivo.id} bottomDivider onPress={() => { props.navigation.navigate('Detalles del Dispositivos',  {userId: dispositivo.id} ) }}>
                                <Avatar source={{ uri: 'https://www.hola.com/imagenes/estar-bien/20210217184541/gatos-gestos-lenguaje-significado/0-922-380/gatos-gestos-m.jpg' }} rounded />
                                <ListItem.Content>
                                    <ListItem.Title>{dispositivo.name}</ListItem.Title>
                                    <ListItem.Subtitle>{dispositivo.namecpu}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        )
                    })
                }
            </ScrollView>
            <View style={Styles.Button} >
                <Button title='Crear Nuevo Dispositivo'
                    onPress={() => { props.navigation.navigate('Crear Nuevo Dispositivos') }}
                />
            </View>
        </View>

    )
}

const Styles = StyleSheet.create({
    ListItem: {
        marginBottom: 5,
        marginTop: 5
    },
    UsersList: {
        
        margin: 5

    },
    Button: {
        margin: 10,
        marginBottom: 20

    },
    Container: {
        height: '100%'
    }
})