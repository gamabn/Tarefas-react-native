import React from "react";
import {View,Text, StyleSheet,TouchableOpacity} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

export default function List({data,deleteItem, showItem}){
    const {nome, key, } = data
    return(

        <View style={styles.container}>

           <TouchableOpacity style={{paddingRight:10}} onPress={() => deleteItem(key)}>
             <Feather name="trash" color="#fff" size={20} />
           </TouchableOpacity>

        <View>
           <TouchableOpacity style={{paddingRight: 10}} onPress={()=> showItem(data)}>
            <Text style={{color:'#fff', paddingRight: 10}}>{nome}</Text>
           </TouchableOpacity>
         </View>


        </View>
    )
}
const styles = StyleSheet.create(
{
    container:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#121212',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 4
    }
}
)