import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Screen_01 from './screens/Screen_01';
import Screen_02 from './screens/Screen_02';
import Screen_03 from './screens/Screen_03';
import Screen_04 from './screens/Screen_04';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator 
        initialRouteName="Screen_01"
      >
        <Stack.Screen name="Screen_01" component={Screen_01}  options={{headerShown: false}}/>
        <Stack.Screen name="Screen_02" component={Screen_02}  options={{headerShown: false}}/>
       <Stack.Screen name="Screen_03" component={Screen_03} options={{headerShown: false}}/> 
        <Stack.Screen name="Screen_04" component={Screen_04} options={{headerShown  : false}}/> 
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
