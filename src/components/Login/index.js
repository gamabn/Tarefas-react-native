import React, { useState } from "react";
import { Text, View, SafeAreaView, TextInput, StyleSheet ,TouchableOpacity, Alert} from "react-native";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password,setPssword] = useState('');
    const [type,setType] = useState('Login');

    function handleLogin(){
        alert('acessar')
       
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
