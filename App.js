import React,{useState} from 'react';
import {StyleSheet, Text,View}  from 'react-native';
import Login from './src/components/Login';



export default function App(){
  const [user, setUser] = useState(null);
   
  if(!user){
    <Login/>
  }

   return(
   <View style={styles.container}>
     
      <Login/>
      
      </View>
   
   )
}

 const styles = StyleSheet.create({
    container:{
      flex: 1,
      paddingTop: 26,
      paddingHorizontal: 10,
      backgroundColor: '#f2f6fc',    
    }
  }
 )