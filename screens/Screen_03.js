import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen_03 = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const storedUsers = await AsyncStorage.getItem('users');
            if (storedUsers !== null) {
                const users = JSON.parse(storedUsers);
                const user = users.find(user => user.email === email);
                if (user) {
                    if (user.password === password) {
                        Alert.alert("Success", "Login successful.");
                        navigation.navigate("Screen_04");
                    } else {
                        Alert.alert("Error", "Incorrect password.");
                    }
                } else {
                    Alert.alert("Error", "Email not found.");
                }
            } else {
                Alert.alert("Error", "No users found. Please sign up first.");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to login.");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/DATA/Image 20.png')} style={styles.imageLogin} />
            <Text style={styles.title}>Welcome!</Text>

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
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Image source={require('../assets/DATA/eye.png')} style={styles.icon} />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.signupLink}
                onPress={() => navigation.navigate('Screen_02')}
            >
                <Text style={styles.signupText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginTop: 30,
        textAlign: 'left',
        fontWeight: 'bold',
        marginLeft: 16,
        paddingBottom: 50,
    },
    inputContainer: {
        flexDirection: "row",
        margin: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: "gray",
        fontWeight: "bold",
    },
    icon: {
        marginRight: 10,
    },
    button: {
        margin: 20,
        padding: 15,
        alignItems: "center",
        backgroundColor: "#4630EB",
        borderRadius: 50,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    imageLogin: {
        width: "100%",
        height: 200,
        justifyContent: 'flex-start',
    },
    signupLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    signupText: {
        color: "#4630EB",
        fontWeight: "bold",
    },
});

export default Screen_03;