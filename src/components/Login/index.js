import React, { useState } from "react";
import { Text, View, SafeAreaView, TextInput, StyleSheet ,TouchableOpacity} from "react-native";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password,setPssword] = useState('')

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

           <TouchableOpacity>
                <Text>
                   Acessar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={{textAlign: 'center', fontSize: 20}}>
                    Criar uma Conta
                </Text>
            </TouchableOpacity>

       
         </View>

    )

}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginTop: 19,
        backgroundColor: '#f2f6fc',
         alignItems: 'center',
         borderRadius: 4

    },
    input:{
        backgroundColor: '#fff',
       borderColor: '#000',
        borderWidth: 1,
        width: '90%',
        marginTop: 10,
        padding: 8,
        borderRadius: 4,
        height: 45,
        marginBottom: 10
      
    }
})
