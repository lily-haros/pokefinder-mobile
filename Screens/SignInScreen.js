import React from "react";
import { View, Text, TextInput, StyleSheet, Button, StatusBar, TouchableOpacity, Image } from "react-native";

import users from "../Backend/users"; // import dummydb for users
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const logo = require('../Assets/Pictures/pokemon-logo.png');




const SignInScreen = ({ route }) => {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { setUserToken, navigation } = route.params || {};
    const navigat = useNavigation();

    const handleSign = () => {
        // sign in logic here

        /* this is test logic for auto sign in */
        const userToken = "token1";

        const user = users.find((user) => user.username === userName && user.password === password);

        if (user) {
            // User is found user is signed in successfully, set the token
            route.params.setUserToken(user.token);
            navigat.navigate('Home'); // navigate to homescreen if user is allowed

        } else {
            // Sign-in failed, show alert
            alert('Invalid username or password. Please try again or sign up.');
            return;
        }
    }

    const navigateToSignUp = () => {
        navigat.navigate('SignUp');
    }

    return (
        // safeareaview to wrap whole page to one view
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={true} />
            <View style={{ backgroundColor: '#ffca08' }} >
                <Image style={styles.logo} source={logo} />
            </View>

            <View style={styles.container}>
                <Text style={styles.signinText}>Sign In</Text>

                <View style={styles.textContainer}>
                    <Text style={styles.textContainer}> User name </Text>
                    <TextInput style={styles.input} onChangeText={setUserName} placeholder="User name" />
                    <Text style={styles.textContainer}> Password </Text>
                    <TextInput style={styles.input} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} />


                    <TouchableOpacity style={styles.signinButton} onPress={handleSign} >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signupButton} onPress={navigateToSignUp} >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
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

    signinText: {
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

    signinButton: {
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

export default SignInScreen;