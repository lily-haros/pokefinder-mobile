import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Alert, Modal, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import users file so can check user data
import users from "../Backend/users";
import { useNavigation } from "@react-navigation/native";


// gets devices window width
const useWindowDimensions = Dimensions.get('window').width;


/* header logo */
const logo = require('../Assets/Pictures/pokemon-logo.png');

const ProfileScreen = ({ route }) => {

    // this just to get devide width and set desired button width
    const buttonWidth = useWindowDimensions * 0.6;
    /* modal for delete confirmation */
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    /* Base idea is to bring usertoken here as initialparam. 
    Then to check it from users.js to get the info needed to render on screen. */

    // catch usertoken from route
    const { userToken: routeUserToken, setUserToken } = route.params || {};

    // for some reason need this dullified navigation just to get somewhere from this screen
    const navigat = useNavigation();

    // find the user from the users
    const user = users.find((user) => user.token === routeUserToken);

    console.log("User object: ", user);
    console.log("Profilepic: ", user.profilePic);

    /* profilepicturemapping */
    const profilePicsMapping = {
        default: require('../Assets/Pictures/ProfilePics/defaultProfile.png'),
        'user1.png': require('../Assets/Pictures/ProfilePics/user1.png'),
        'user2.png': require('../Assets/Pictures/ProfilePics/user2.png'),
    };

    const profilePic = profilePicsMapping[user.profilePic] || profilePicsMapping.default;

    
    /* const profilePicPath = require('../Assets/Pictures/ProfilePics/user1.png'); */

    // Check if user is found
    if (!user) {
        alert('User not found.')
        return null;
    }
    const handleLogout = () => {
        // simply set userToken to null for logout and then navigate to signin
        setUserToken(null);
        navigat.navigate('SignIn');
    }

    const deleteUser = () => {
        /* console.log("Inside delete. Token to be deleted = ", user.token); */
        const userToDelete = user;
        const userTokenToDelete = user.token;

        /* console.log("usertoken test: ", userTokenToDelete); */

        const updatedUsers = users.filter(user => user.token !== userTokenToDelete);

        console.log("updated length: ", updatedUsers.length);

        // check if user got deleted
        if (updatedUsers.length < users.length) {
            console.log("Deleted user: ", userToDelete);
        } else {
            // user deletion error
            Alert.alert('Error', 'User not found maybe.');
        }
    };

    // Delete profile
    const handleDeleteProfile = () => {
        // Alert modal
        Alert.alert(
            // Texts in modal
            'Confirm deletion',
            `Are you sure you want to delete your account?`,
            [
                {
                    // cancel button
                    text: 'Cancel',
                    onPress: () => setShowDeleteModal(false),
                },
                {
                    // confirm button
                    text: 'Confirm',
                    onPress: () => {
                        // delete logic from function
                        deleteUser();
                        // then set token to null and vaigate to signin
                        handleLogout(); 
                    },

                },
            ],
            { cancelable: false }
        )
    }

    // user found so render info
    return (
        <View style={{ flex: 1, backgroundColor: '#ffca08' }}>
            <StatusBar translucent={true} />
            <Image style={styles.logo} source={logo} />

            <SafeAreaView style={{ flex: 1 }}>

                <View style={styles.container}>
                    <Image source={profilePic} style={styles.pictureStyle} />
                    <Text style={styles.name}> Nickname: {user.nickname} </Text>
                    <Text style={styles.name}> Username: {user.username} </Text>
                    {/* LOGOUT BUTTON */}
                    <View>
                        <TouchableOpacity style={[styles.logoutButton, { width: buttonWidth }]} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                    {/* DELETE ACCOUNT BUTTON */}
                    <View>
                        <TouchableOpacity style={[styles.deleteButton, { width: buttonWidth }]} onPress={handleDeleteProfile}>
                            <Text style={styles.logoutButtonText}>Delete account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );


};

/* HERE STYLES */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pictureStyle: {
        width: 240,
        height: 280,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        textAlign: 'center',
        fontSize: 35,
        marginBottom: 10,

    },
    logoutButton: {
        backgroundColor: "#260062",
        paddingVertical: 10,
        margin: 5,
        borderRadius: 30,

    },
    logoutButtonText: {
        color: "#ffffff",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700',

    },
    logo: {
        width: 130,
        resizeMode: 'contain',
        marginTop: 50,
        marginLeft: 130,

    },
    deleteButton: {
        backgroundColor: "red",
        paddingVertical: 10,
        margin: 5,
        borderRadius: 30,

    },

});

export default ProfileScreen;