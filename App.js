import React, { useState } from 'react';
import { NavigationContainer, View } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Users from './screens/Users'
import CreateUsersScreen from './screens/CreateUsersScreen'
import UsersDetailScreen from './screens/UserDetailScreen'
import EditarDispositivo from './screens/EditarDispositivos'
import Camera from './screens/Camera'
import Login from './screens/Login'

import { StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements'


import firebase from './database/firebase'




function MyStack() {

  const [user, setUser] = useState(false)


  firebase.auth.onAuthStateChanged(User => {
    if (User) {
      setUser(true)
      console.log('Existe')
    } else {
      console.log('no Existe')
    }
  })

  if (!user) {
    return (

      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login}        />
      </Stack.Navigator>

    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Dispositivos"

        options={
          ({ route, navigation }) => ({ // get reference to navigation
            headerRight: () => {
              return (
                <Icon
                  raised
                  brand
                  name='log-out-outline'
                  type='ionicon'
                  color='#0099'
                  onPress={
                    () => {
                      firebase.auth.signOut();
                      navigation.navigate('Iniciar Sesion')


                    }
                  }
                />);
            }
          })}
        component={Users}
      />

      <Stack.Screen name="Detalles del Dispositivos"
        options={({ route, navigation }) => ({ // get reference to navigation
          headerRight: () => {
            return (
              <Icon
                raised
                name='pencil'
                type='material-community'
                color='#0099'
                onPress={() => { navigation.navigate('Editar Dispositivo', { userId: route.params.userId }) }} />);
          }
        })}
        component={UsersDetailScreen} />
      <Stack.Screen name="Iniciar Sesion" component={Login}
        options={
          {
            headerShown: false
          }
        }
      />


      <Stack.Screen name="Crear Nuevo Dispositivos" component={CreateUsersScreen} />
      <Stack.Screen name="Editar Dispositivo" component={EditarDispositivo} />
      <Stack.Screen name="Camera" component={Camera} />


    </Stack.Navigator>

  )
}

export default function App() {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const Styles = StyleSheet.create({
  Button: {
    margin: 5
  }
})