import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const SplashScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>

            <ActivityIndicator size={"large"} />

            <Text style={styles.textstyle}>Loading pokemon location...</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff821b",
    },

    textstyle: {
        color:"#000",
        fontSize:24,

    }


});

export default SplashScreen;