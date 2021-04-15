import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, } from 'react-native'
import { Avatar, Divider, Icon } from 'react-native-elements'
import firebase from '../database/firebase'
import TimeAgo from 'react-native-timeago';






export default function UsersDetailScreen(props) {
    const id = props.route.params.userId
    const initialState = [{
        name: '',
        namecpu: '',
        procesador: '',
        placamadre: '',
        ram: '',
        disco: '',
        descripcion: '',

    }]
    const [state, setState] = useState(initialState)


    const getUsersById = async () => {
        const dbRef = firebase.db.collection('Dispositivos').doc(id)
        const doc = await dbRef.get()
        const disp = doc.data();
        setState({ ...disp, id: id })

    }



    useEffect(() => {
        getUsersById()
    }, [])





    return (
        <ScrollView style={Styles.container}>
            <View style={Styles.AvatarImg}>
                <Avatar source={{ uri: 'https://www.hola.com/imagenes/estar-bien/20210217184541/gatos-gestos-lenguaje-significado/0-922-380/gatos-gestos-m.jpg' }} size="xlarge" rounded />
            </View>
            <View>
                <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 25 }} >{state.name}</Text>
            </View>
            <Divider style={{ backgroundColor: '#cccccc' }} />
            <View style={Styles.TextContainer}>
                <Icon
                    name='desktop-mac'
                    type='material'
                    size={24}
                    color='black'
                />
                <Text style={Styles.Text} >{state.namecpu}</Text>
            </View>
            <Divider style={{ backgroundColor: '#cccccc' }} />
            <View style={Styles.TextContainer}>
                <Icon
                    name='memory'
                    type='material'
                    size={24}
                    color='black'
                />
                <Text style={Styles.Text} >{state.procesador}</Text>
            </View>
            <Divider style={{ backgroundColor: '#cccccc' }} />
            <View style={Styles.TextContainer}>
                <Icon
                    name='storage'
                    type='material'
                    size={24}
                    color='black'
                />
                <Text style={Styles.Text} >{state.ram}</Text>
            </View>
            <Divider style={{ backgroundColor: '#cccccc' }} />
            <View style={Styles.TextContainer}>
                <Icon
                    name='database'
                    type='material-community'
                    size={24}
                    color='black'
                />
                <Text style={Styles.Text} >{state.disco}</Text>
            </View>
            <Divider style={{ backgroundColor: '#cccccc' }} />
            <View style={Styles.TextContainer}>
                <Icon
                    name='wysiwyg'
                    type='material'
                    size={24}
                    color='black'
                />
                <Text style={Styles.Text} >{state.placamadre}</Text>
            </View>
            <Divider style={{ backgroundColor: '#cccccc' }} />
            <View style={Styles.TextContainer}>
                <Icon
                    name='file-document-edit-outline'
                    type='material-community'
                    size={24}
                    color='black'
                />
                <Text style={Styles.Text} >{state.descripcion}</Text>
            </View>
            <Divider style={{ backgroundColor: '#cccccc' }} />
            <View style={Styles.TextContainer}>
                <Icon
                    name='clock-time-four-outline'
                    type='material-community'
                    size={24}
                    color='black'
                />
                <Text style={Styles.Text}>
                    Ultima Revision: {state?.timestamp?.toDate()
                        ? <Text><TimeAgo time={state.timestamp?.toDate()} /></Text>
                        : <Text>Nunca</Text>}
                </Text>

            </View>

        </ScrollView>
    )
}


const Styles = StyleSheet.create({
    TextDescription: {
        display: 'none',
    },
    container: {
        flex: 1,
        paddingHorizontal: 35,
        paddingTop: 20
    },
    TextContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
       
    },
    AvatarImg: {
        display: 'flex',
        alignItems: 'center'
    },
    Text: {
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10
    }
})