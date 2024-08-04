import React, { useState } from "react";
import { Text, View, SafeAreaView, TextInput, StyleSheet ,TouchableOpacity,} from "react-native";
import { database ,auth } from '../../services/firebaseConnection'
import { ref, set, push,onValue, } from 'firebase/database';
import { firebase } from '@react-native-firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({changeStatus}) {
    const [email, setEmail] = useState('');
    const [password,setPssword] = useState('');
    const [type,setType] = useState('Login');

   async function handleLogin(){
        if(type === 'Login'){

         const userCredential = await signInWithEmailAndPassword(auth,email,password)
         
       await AsyncStorage.setItem('user', JSON.stringify(userCredential.user.uid)
       )
         changeStatus(userCredential.user.uid)
        console.log(userCredential.user.email);
       // alert(userCredential.user.email)

         
        }else{
            const createCredential = await createUserWithEmailAndPassword(auth, email, password);
            //console.log(userCredential)
            
            await AsyncStorage('user', JSON.stringify(createCredential.user.uid))
           
            changeStatus(createCredential.user.uid)
        }
       
    }

    return (

        <View style={styles.content}>
      
       
            <TextInput
              placeholder="Digite seu email"
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                placeholder="*********"
                style={styles.input}
                value={password}
                onChangeText={(text) => setPssword(text)}
            />

           <TouchableOpacity
            style={[styles.handleLogin, { backgroundColor: type === 'Login' ? '#3ea6f2' : '#141414' } ] }
             onPress={handleLogin}>
                <Text style={{color:'#fff', fontSize: 20}}>
                  {type === 'Login' ? 'Acessar' : 'Cadastrar'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> setType(type => type === 'Login' ? 'Cadastrar' : 'Login')}>
                <Text style={{textAlign: 'center', fontSize: 20}}>
                   {type === 'Login' ? 'Criar uma Conta' : 'Ja possuo um conta'}
                </Text>
            </TouchableOpacity>

       
         </View>

    )

}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#f2f6fc',
       paddingHorizontal: 10,

    },
    input:{
        backgroundColor: '#fff',
        borderColor: '#141414',
        borderWidth: 1,
        borderRadius: 4,
        height: 45,
        marginBottom: 10,
        padding: 10
      
    }, 
    handleLogin:{
       alignItems: 'center',
       color: '#fff',
      
        borderColor: '#141414',
        borderWidth: 1,
        borderRadius: 4,
        height: 45,
        marginBottom: 10,
        padding: 10
    }
})
