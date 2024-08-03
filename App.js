import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,FlatList } from 'react-native';
import Login from './src/components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from './src/components/List'


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

 let task = [ 
  {key: '1',nome: 'comprar Coca Cola'},
  {key: '2',nome: 'Estudar React'},
  {key: '3',nome: 'Estudar Next'}
]

function HandleDelete(key){
   alert(key)
}

function handleItem(data){
  console.log(data)
}


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
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

      </View>

      <FlatList
       data={task}
       keyExtractor={item => item.key}
       renderItem={({item})=> (<List data={item} deleteItem={HandleDelete} showItem={handleItem}/>)}
      
      />

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 26,
    paddingHorizontal: 10,
    backgroundColor: "#f2f6fc"
  },
  containerTask:{
   flexDirection: 'row'
   

  },
  input:{
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
   height: 45   
  },
  buttonAdd:{
   backgroundColor: '#141414',
   height: 45,
   alignItems: 'center',
   justifyContent: 'center',
   marginLeft: 5,
   paddingHorizontal: 14,
   borderRadius: 4
  },
  buttonText:{
    color: '#fff',
    fontSize: 28
  }

  
}
)