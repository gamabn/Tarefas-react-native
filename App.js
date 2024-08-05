import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import Login from './src/components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from './src/components/List';
import { database } from './src/services/firebaseConnection';
import { ref, push,set, onValue, remove,update } from 'firebase/database';

export default function App() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [task, setTask] = useState([]);
  const [key,setKey] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    async function loadStorage() {
      const storedUser = await AsyncStorage.getItem('user');
      console.log('Usuário carregado do AsyncStorage:', storedUser); // Adicione este log
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    loadStorage();
  }, []);

  useEffect(() => {
    if (user) {
      const tasksRef = ref(database, `tarefas/${user}`);
      const unsubscribe = onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Dados das tarefas:', data); // Adicione este log
        if (data) {
          const parsedTasks = Object.keys(data).map(key => ({
            key,
            ...data[key]
          }));
          setTask(parsedTasks);
        } else {
          setTask([]);
        }
      });

      // Clean up the listener on component unmount
      return () => unsubscribe();
    }
  }, [user]);

  async function handleAdd() {
    if (newTask === '') return;

    if (key !== '') {
      try {
        await update(ref(database, `tarefas/${user}/${key}`), {
          nome: newTask
        });
        Keyboard.dismiss()
        setNewTask('');
        setKey('');
        return;
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    } else {
      try {
        const userRef = ref(database, `tarefas/${user}`);
        const newTaskRef = push(userRef);
        await set(newTaskRef, {
          nome: newTask,
        });

        setNewTask('');
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    }
    
  }
  async function handleLogout() {
    await AsyncStorage.removeItem('user');
    setUser(null);
  }

  async function handleDelete(key) {
    try {
      const refDelete = ref(database, `tarefas/${user}/${key}`);
      await remove(refDelete);
      alert('Tarefa removida', key);

      const taskDelet = task.filter(item => item.key !== key);
      setTask(taskDelet);

    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      alert('Erro ao deletar tarefa.');
    }
  }

 async function handleEdit(data) {
    try{
      setNewTask(data.nome)
      inputRef.current.focus()
      setKey(data.key)

    
    }catch(error){
      console.error("Erro ao atualizar tarefas:", error);
      alert('Erro ao editar tarefa.');

    }
    //await update(ref(database, 'usuario/2'), {
      // nome: 'Vai se fuder'
     //})
         
   // alert(data)
   // console.log(data);
  }

  if (!user) {
    return (
      <Login changeStatus={(user) => setUser(user)} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder='O que vai fazer hoje'
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={task}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <List data={item} deleteItem={handleDelete} showItem={handleEdit} />
        )}
      />
      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 26,
    paddingHorizontal: 10,
    backgroundColor: "#f2f6fc",
  },
  containerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45,
  },
  buttonAdd: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
  },
  buttonLogout: {
    backgroundColor: '#f00',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 14,
    borderRadius: 4,
  }
});



