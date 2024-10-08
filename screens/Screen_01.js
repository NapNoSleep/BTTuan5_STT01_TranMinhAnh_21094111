import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image, SafeAreaView, TouchableOpacity } from 'react-native-web';

const Screen_01 = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#f5f5f5'
    }}>
        <Image source={require('../assets/DATA/Container 17.png')}/>
        <Text style={{fontSize:20, fontWeight:700, marginTop:18, marginLeft:40, textAlign: 'left', width: '100%'
        }}>Boost Productivity</Text>
        <Text style={{marginLeft:40,marginTop:13, textAlign: 'left', width: '100%'}}>Simplify tasks, boost productivity</Text>
        <TouchableOpacity 
          onPress={()=>{navigation.navigate("Screen_02")}}
        style={{backgroundColor:'#25c3d9',marginTop:15,borderRadius:50,padding:8, width:"90%"}}>
          <Text style={{color:'white',
          textAlign:'center'
          }}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>{navigation.navigate("Screen_03")}}
        style={{marginTop:10,borderRadius:50,padding:8, width: "90%"}}>
          <Text style={{textAlign: 'center'}}>Login</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Screen_01;

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})