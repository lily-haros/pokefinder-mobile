import React from 'react';
import { View, Text, Button, StatusBar, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import users from "../Backend/users"; // import dummydb for users
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

const logo = require('../Assets/Pictures/pokemon-logo.png');

const SignUpScreen = ({ navigation }) => {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigat = useNavigation();

    const handleSignUp = () => {
        console.log("users before signup: ", users);
        // first check if user allready exists
        const existingUser = users.find(user => user.username === userName);
        if (existingUser) {
            alert("Username already in use, pick another username or sign in usign ur existing account");
            return;
        }

        // generate unique token
        const token = uuidv4();
        // Add user
        users.push({ id: users.length + 1, username: userName, password, token });

        console.log('Saving user: ', userName);

        console.log("users after signup: ", users);
        // automatically after succesful signup navigate to signin
        navigat.navigate('SignIn');

    }

    const navigateToSignIn = () => {
        navigat.navigate('SignIn');
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={true} />
            <View style={{ backgroundColor: '#ffca08' }} >
                <Image style={styles.logo} source={logo} />
            </View>

            <View style={styles.container}>
                <Text style={styles.signupText}>Sign Up</Text>

                <View style={styles.textContainer}>
                    <Text style={styles.textContainer}> User name </Text>
                    <TextInput style={styles.input} onChangeText={setUserName} placeholder="User name" />
                    <Text style={styles.textContainer}> Password </Text>
                    <TextInput style={styles.input} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} />

                    <View>
                        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp} >
                            <Text style={styles.buttonText}>Sign up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={navigateToSignIn} >
                            <Text style={styles.buttonText}>Navigate back to Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>



            </View>

        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#44D360",
        justifyContent: 'center',

    },

    signupText: {
        fontSize: 32,
        color: '#ffff',
        fontWeight: '900',
        marginBottom: 15,
    },

    textContainer: {
        justifyContent: 'center',
        width: '80%',
        fontWeight: "bold",
        color: "#000000",
    },

    input: {
        height: 60,
        margin: 12,
        borderWidth: 3,
        borderRadius: 30,
        padding: 10,
        fontWeight: "bold",
        color: "#000000",
    },

    backButton: {
        backgroundColor: "#000000",
        margin: 5,
        padding: 10,
        borderRadius: 30,

    },

    signupButton: {
        backgroundColor: "#260062",
        margin: 5,
        padding: 10,
        borderRadius: 30,

    },

    buttonText: {
        color: "#ffffff",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "700",
    },

    logo: {
        width: 100,
        resizeMode: 'contain',
        marginTop: 5,
        marginLeft: 140,
    },

});

export default SignUpScreen;