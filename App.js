import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Login from './src/components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('')

 useEffect( ()=>{ 
   async function LoadStorage(){
    const storedUser = await AsyncStorage.getItem('user');
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
   }
   LoadStorage()
 },[])


  if (!user) {
    return (
      <Login 
      changeStatus={(user) => setUser(user)} 
     
      />
    )
  }

  return (
    <View style={styles.container}>

      <View style={styles.containerTask}>


        <TextInput
          style={styles.input}
          placeholder='O que vai fazer hoje'
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity>
          <Text>Cadastrar tarefa</Text>
        </TouchableOpacity>

      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 26,
    paddingHorizontal: 10,
    backgroundColor: '#f2f6fc',
  },
  containerTask:{
    alignItems: "center"
  }
}
)