import React, { useState, useEffect } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View, SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    Alert,
    Modal,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

import PokemonCard from './PokemonCard';
import { usePokemonContext } from '../PokemonContext';
import { useOwnPokemonContext } from '../OwnPokemonContext';

const logo = require('../Assets/Pictures/pokemon-logo.png');

const useWindowDimensions = Dimensions.get('window').width;


const ListOwnPokemon = () => {
    const [ownPokemonList, setData] = useState([]);
    const { ownPokemonsCont, removePokemon, setOwnPokemonList } = useOwnPokemonContext();
    const [ownPokemonListToShow, setList] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const navigation = useNavigation();
    const { setSelectedPokemon } = usePokemonContext();

    const buttonWidth = useWindowDimensions * 0.6;

    useEffect(() => {
        // This effect will run whenever ownPokemonsCont changes
        setOwnPokemonList(ownPokemonsCont); // updated context gets rendered
    }, [ownPokemonsCont]); 

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
            const filteredList = ownPokemonList.filter(pokemon => pokemon.types[0].type.name === value.value);
            setList(filteredList);
        }
        else {
            setList(ownPokemonList);
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

    // pokemon poistetaan vain listauksesta eikä varsinaisesta tietokannasta, sillä ajanpuutteen vuoksi omat pokemonit on listattu kovakoodattuun arrayhin tietokannan sijaan

    const deletePokemon = (id) => {
        console.log("id in delete: ", id);
        removePokemon(id);
    };

    const getPokemonFromDatabase = async () => {
        try {
            let results = [];

            ownPokemonsCont.sort(function (a, b) { return a - b });

            for (let i = 0; i < ownPokemonsCont.length; i++) {
                let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ownPokemonsCont[i]}`);
                response = await response.json();
                results.push(response);
            }
            setData(results);
            setList(results);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        getPokemonFromDatabase();
    }, [ownPokemonsCont]);


    const handleDeletePokemon = (id) => {
        console.log("in del modal:_", id);
        Alert.alert(
            '',
            `Are you sure you want to delete this pokemon from your list?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => setShowDeleteModal(false),
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        console.log("in del modal confirm:_", id);
                        deletePokemon(id);

                    },

                },
            ],
            { cancelable: false }
        )
    };




    return (
        <SafeAreaView>
            <StatusBar translucent={true} />
            <View style={{ backgroundColor: '#ffca08', height: '100%' }}>
                <Image
                    style={styles.logo}
                    source={logo}
                />
                <View style={styles.searchAndFilter}>
                    < DropdownList />
                    <TextInput style={styles.searchBox} placeholder='Search' onChangeText={setSearch} value={search} />
                </View>
                <FlatList
                    data={ownPokemonListToShow.filter((item) => item.name.includes(search.toLowerCase()))}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            value={item.id}
                            onPress={() => {
                                setSelectedPokemon(item);
                                navigation.navigate(PokemonCard);
                            }}
                            onLongPress={() => {
                                /*  */
                                console.log("Pokemons order is:_", item.id);
                                handleDeletePokemon(item.id);
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


export default ListOwnPokemon;

