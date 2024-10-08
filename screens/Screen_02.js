import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen_02 = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (username && email && password && agree) {
      const newUser = { username, email, password };
      try {
        let users = [];
        const storedUsers = await AsyncStorage.getItem('users');
        if (storedUsers !== null) {
          users = JSON.parse(storedUsers);
        }
        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        Alert.alert("Success", "User registered successfully!");
        // Clear the input fields
        setUsername("");
        setEmail("");
        setPassword("");
        setAgree(false);
        navigation.navigate("Screen_01");
      } catch (error) {
        Alert.alert("Error", "Failed to register user.");
      }
    } else {
      Alert.alert("Error", "Please fill all fields and agree to the terms.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/DATA/Image 19.png')} style={styles.image} />
        <Text style={styles.title}>Nice to see you!</Text>
        <Text style={styles.subtitle}>Create your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/DATA/codicon_account.png')} style={styles.icon} />
        <TextInput
          placeholder="Enter your username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/DATA/Vector.png')} style={styles.icon} />
        <TextInput
          placeholder="Enter your email address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/DATA/lock.png')} style={styles.icon} />
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image source={require('../assets/DATA/eye.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          style={styles.checkbox}
          value={agree}
          onValueChange={() => setAgree(!agree)}
          color={agree ? "#4630EB" : undefined}
        />
        <Text style={styles.checkboxText}>
          I agree with
          <TouchableOpacity>
            <Text style={styles.link}> Terms & Conditions</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  image: {},
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    margin: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "gray",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginLeft: 15,
    padding: 15,
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    textAlign: "center",
    color: "gray",
  },
  link: {
    color: "#4630EB",
  },
  button: {
    margin: 20,
    padding: 15,
    alignItems: "center",
    backgroundColor: "#4630EB",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Screen_02;