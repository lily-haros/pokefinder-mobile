/**
 * Tämä on vain testi että toimiiko GIT autotunnistus
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Image,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokemonProvider } from './PokemonContext';
import { UserProvider } from './UserContext';
import { OwnPokemonProvider } from './OwnPokemonContext';

/* Let the screens flow!! */
import ProfileScreen from './Screens/ProfileScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import SplashScreen from './Screens/SplashScreen';
import HomeScreen from './Screens/HomeScreen';
import PokemonCard from './Screens/PokemonCard';
import OwnPokemonScreen from './Screens/OwnPokemonScreen';
import ListOwnPokemon from './Screens/ListOwnPokemon';
import Camera from './camera';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getIsSignedIn = () => {
  return true; // TODO: Implement this!
}

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // for now it is faked auth
    const fakeLoadingTask = setTimeout(() => {

      // testing token for autologin
      const autoLoginToken = "token1";

      setUserToken(autoLoginToken);

      /* const token = null; //Assume user is not SignedIn

      setUserToken(token); */

      // hide activityindicator after period of load
      setIsLoading(false);
    }, 4000); // 4000ms or 4secs for splashscreen

    // Clear if component is unmounted before loading
    return () => clearTimeout(fakeLoadingTask);
  }, []);

  // if loading stuff show splash
  if (isLoading) {
    return <SplashScreen />;
  }


  return (
    <NavigationContainer>
      <PokemonProvider>
        <UserProvider>
          <OwnPokemonProvider>
            {userToken ? (
              // User is authenticated so bottomnav is shown and auth access to function screens
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarStyle: {
                    height: 70,
                    backgroundColor: '#ffca08',
                  },
                })}
              >
                {/* ALL POKEMON*/}
                <Tab.Screen options={{
                  headerShown: false, tabBarShowLabel: false,
                  tabBarIcon: ({ size, focused, color }) => {
                    const iconSize = focused ? 50 : 40;
                    const iconTintColor = focused ? 'black' : 'gray';

                    return (

                      <Image
                        style={[styles.tinyIcon, { width: iconSize, height: iconSize }, { tintColor: iconTintColor }]}
                        source={require('./Assets/Pictures/home.png')}

                      />

                    );
                  },
                }} name="Home" component={HomeScreen} />


                {/* OWN POKEMON */}
                <Tab.Screen options={{
                  headerShown: false, tabBarShowLabel: false,
                  tabBarIcon: ({ size, focused, color }) => {
                    const iconSize = focused ? 50 : 40;
                    const opacityValue = focused ? 1.0 : 0.3;

                    return (
                      <Image
                        style={[styles.biggerIcon, { width: iconSize, height: iconSize }, { opacity: opacityValue }]}
                        source={require('./Assets/Pictures/pokeball.png')}
                      />
                    );
                  },
                }} name="ListOwnPokemon" component={ListOwnPokemon} />

                {/* CAMERA */}
                <Tab.Screen options={{
                  headerShown: false, tabBarShowLabel: false,
                  tabBarIcon: ({ size, focused, color }) => {
                    const iconSize = focused ? 50 : 40;
                    const iconTintColor = focused ? 'black' : 'gray';

                    return (
                      <Image
                        style={[styles.tinyIcon, { width: iconSize, height: iconSize }, { tintColor: iconTintColor }]}
                        source={require('./Assets/Pictures/camera.png')}
                      />
                    );
                  },
                }} name="Camera" component={Camera} />

                {/* PROFILE SCREEN */}
                <Tab.Screen options={{
                  headerShown: false, tabBarShowLabel: false,
                  tabBarIcon: ({ size, focused, color }) => {
                    const iconSize = focused ? 50 : 40;
                    const iconTintColor = focused ? 'black' : 'gray';

                    return (
                      <Image
                        style={[styles.tinyIcon, { width: iconSize, height: iconSize }, { tintColor: iconTintColor }]}
                        source={require('./Assets/Pictures/profile.png')}
                      />
                    );
                  },
                }} name="Profile" component={ProfileScreen} initialParams={{
                  /* pass setUserToken and userToken for profile screen */
                  userToken: userToken,
                  setUserToken: setUserToken
                }} />

                {/* PokemonCard */}
                <Tab.Screen options={{
                  headerShown: false, tabBarShowLabel: false,
                  tabBarIcon: ({ size, focused, color }) => {
                    const iconSize = focused ? 50 : 40;
                    const iconTintColor = focused ? 'black' : 'gray';

                    return (
                      <Image
                        style={[styles.tinyIcon, { width: iconSize, height: iconSize }, { tintColor: iconTintColor }]}
                        source={require('./Assets/Pictures/search.png')}
                      />
                    );
                  },
                }} name="PokemonCard" component={PokemonCard} />

              </Tab.Navigator>
            ) : (
              // User is not authenticated, show signins signups etc
              <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name='SignIn'
                  initialParams={{
                    setUserToken /* pass setUserToken for SignIn Screen */
                  }} >
                  {(props) => <SignInScreen {...props} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name='SignUp' component={SignUpScreen} />
              </Stack.Navigator>

            )}
          </OwnPokemonProvider>
        </UserProvider>
      </PokemonProvider>
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({

  searchAndFilter: {
    flexDirection: 'row',
  },
  dropDown: {
    alignSelf: 'center',
    height: 40,
    width: 150,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    marginLeft: 28,
    margin: 18,
    backgroundColor: 'white',
  },
  searchBox: {
    backgroundColor: 'white',
    height: 40,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 8,
    width: 150,
    alignSelf: 'center',
    margin: 18,
  },
  listPokemon: {
    flexDirection: 'row',
    alignSelf: 'center',
    JustifyContent: 'space-evenly',
    width: '90%',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  listImage: {
    alignSelf: 'flex-start',
    padding: 10,
    height: 130,
    width: 130,
  },
  listText: {
    alignSelf: 'center',
    fontSize: 25,
    padding: 10,
  },
  logo: {
    width: 130,
    resizeMode: 'contain',
    marginTop: 50,
    marginLeft: 130,
  },
  tinyIcon: {
    width: 40,
    height: 40,
    borderRadius: 40,

  },
  biggerIcon: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  container: {
    marginTop: 100,
  },
});

export default App;
