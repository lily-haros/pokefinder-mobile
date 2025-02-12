import React, { useState, useEffect } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View, SafeAreaView,
    StatusBar,
    Text,
    TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

import PokemonCard from './PokemonCard';
import { usePokemonContext } from '../PokemonContext';

const logo = require('../Assets/Pictures/pokemon-logo.png');


const HomeScreen = () => {
    const [pokemonList, setData] = useState([]);
    const [pokemonListToShow, setList] = useState([]);
    const navigation = useNavigation();
    // get pokemonContext to detour navigation route params
    const { setSelectedPokemon } = usePokemonContext();


    const types = [
        { label: 'show all', value: 'all' },
        { label: 'fire', value: 'fire' },
        { label: 'water', value: 'water' },
        { label: 'bug', value: 'bug' },
        { label: 'normal', value: 'normal' },
        { label: 'electric', value: 'electric' },
    ];

    const [value, setValue] = useState(null);
    const [search, setSearch] = useState('');

    const FilterShownPokemon = (value) => {
        if (value.value != 'all') {
            const filteredList = pokemonList.filter(pokemon => pokemon.types[0].type.name === value.value);
            setList(filteredList);
        }
        else {
            setList(pokemonList);
        }
    }

    const DropdownList = () => {
        const [isFocus, setIsFocus] = useState(false);

        return (
            <View>
                <Dropdown
                    style={[styles.dropDown, isFocus && { borderColor: 'black' }]}
                    data={types}
                    maxHeight={340}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Choose type' : 'Choose type'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={value => {
                        setValue(value);
                        setIsFocus(false);
                        FilterShownPokemon(value);
                    }}
                />
            </View>
        );
    };

    const getPokemonFromApi = async () => {
        try {
            let results = [];

            // I will cut the fetched list to half '20' for more flawless functionality

            for (let i = 1; i < 21; i++) {
                let response = await fetch(('https://pokeapi.co/api/v2/pokemon/' + i), {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
                response = await response.json();
                results.push(response);
            }
            setData(results);
            setList(results);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPokemonFromApi();
        
    }, []);


    return (
        <SafeAreaView>
            <StatusBar translucent={true} />
            <View style={{ backgroundColor: '#a5db1f', height: '100%' }}>
                <Image
                    style={styles.logo}
                    source={logo}
                />
                <View style={styles.searchAndFilter}>
                    < DropdownList />
                    <TextInput style={styles.searchBox} placeholder='Search' onChangeText={setSearch} value={search} />
                </View>
                <FlatList
                    data={pokemonListToShow.filter((item) => item.name.includes(search.toLowerCase()))}
                    renderItem={({ item }) =>

                        // lets save the selected pokemon to global context hook
                        <TouchableOpacity
                            value={item.order}
                            onPress={() => {
                                setSelectedPokemon(item);
                                navigation.navigate(PokemonCard);

                                // debug log only (item data is here)
                                /* console.log("FROM HomeScreen: ", item); */
                            }}
                        >

                            <View style={styles.listPokemon}>
                                <Image source={{ uri: item.sprites.front_default }} style={styles.listImage} />
                                <Text style={styles.listText}>{item.name}</Text></View>
                        </TouchableOpacity>}
                />
            </View>
        </SafeAreaView>

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
});


export default HomeScreen;

