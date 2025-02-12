
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';

/* context to demo functionalities */
import { usePokemonContext } from '../PokemonContext';
import { useOwnPokemonContext } from '../OwnPokemonContext';

const logo = require('../Assets/Pictures/pokemon-logo.png');
const addButton = require('../Assets/Pictures/add-button.png');
const checkButton = require('../Assets/Pictures/check.png');

const useWindowDimensions = Dimensions.get('window').width;

const PokemonCard = () => {

  const [showAddModal, setShowAddModal] = useState(false);

  // context hook to get data from PokemonContext
  const { selectedPokemon } = usePokemonContext();

  // context hook to get data from own pokemons -> can add more functions as needed
  const { addPokemon, ownPokemonsCont } = useOwnPokemonContext();

  console.log("owns: ", ownPokemonsCont);
  /* console.log("sel poke order: ", selectedPokemon.order); */

  const buttonWidth = useWindowDimensions * 0.6;

  const handleAddPokemon = (id) => {
    console.log("in add modal:_", id);
    Alert.alert(
        '',
        `Are you sure you want to add this pokemon to your list?`,
        [
            {
                text: 'Cancel',
                onPress: () => setShowAddModal(false),
                style: 'cancel'
            },
            {
                text: 'Confirm',
                onPress: () => {
                  console.log("inside try to add");
                  addPokemon(selectedPokemon.id);
                },

            },
        ],
        { cancelable: false }
    )
};

  // image mapper to pool typeimages
  const typeImageMap = {
    fire: require('../Assets/Pictures/fire.png'),
    grass: require('../Assets/Pictures/grass.png'),
    water: require('../Assets/Pictures/water.png'),
    electric: require('../Assets/Pictures/electric.png'),
    bug: require('../Assets/Pictures/bug.png'),
    normal: require('../Assets/Pictures/normal.png'),
  };

  const IsPokemoninOwnList = () => {
    if (ownPokemonsCont.includes(selectedPokemon?.id)){
      return (
        <View style={{ margin: 40 }}>
          <Image source={checkButton} style={styles.addButtonStyle } />
        </View>
      )
    }
    else {
      return (
        <View>
          <TouchableOpacity style={{ margin: 40 }} onPress={handleAddPokemon}>
          <Image source={addButton} style={styles.addButtonStyle } />
          </TouchableOpacity>
        </View>
      )
    }
};

  const GetBasicInfo = () => {
    // check the correct type image
    const pokemonType = selectedPokemon?.types[0].type.name;
    const typeImage = typeImageMap[pokemonType];

    return (

      // for rendering basic pokemon info
      <View>
        <View style={styles.typeContainer}>
          <Text style={styles.cardInfo}>Type: {pokemonType}</Text>
          {/* add typeimage */}
          <Image source={typeImage} style={styles.typeImage} />
        </View>
        <Text style={styles.cardInfo}>Height: {selectedPokemon?.height}</Text>
        <Text style={styles.cardInfo}>Weight: {selectedPokemon?.weight}</Text>

      </View>
    )
  };

  return (
    <SafeAreaView>
      <StatusBar translucent={true} />
      <View style={{ backgroundColor: '#FF831A', height: '100%' }}>
        <Image
          style={styles.logo}
          source={logo}
        />
        <View style={styles.pokemonCard}>
          <View style={styles.cardImageContainer}>
            <Image source={{ uri: selectedPokemon?.sprites?.front_default }} style={styles.cardImage} />

          <IsPokemoninOwnList />
          </View>
          <View style={styles.cardHeaderContainer}>
            <Text style={styles.cardHeader}># {selectedPokemon?.order}</Text>
            <Text style={styles.cardHeader}>{selectedPokemon?.name}</Text>
          </View>
          <View style={styles.cardInfoContainer}>
            <GetBasicInfo />
          </View>
        </View>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  pokemonCard: {
    flex: 1,
    width: '90%',
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
  },
  cardImageContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  cardImage: {
    resizeMode: 'contain',
    height: 150,
    width: 150,
  },
  cardHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '70%',
  },
  cardInfoContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '70%',
    marginTop: 20,
    marginLeft: 40,
    marginBottom: 20,
  },
  cardInfo: {
    fontSize: 19,
    color: 'black',
    padding: 10,
  },
  cardHeader: {
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 22,
    color: 'black',
    marginLeft: 50,
  },
  listPokemon: {
    flexDirection: 'row',
    alignSelf: 'center',
    JustifyContent: 'space-evenly',
    width: '90%',
    padding: 10,
    margin: 5,
    borderWidth: 1,
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
  addButtonStyle: {
    height: 45,
    width: 45,
    paddingLeft: 20,
  },
  typeContainer:{
    flexDirection: 'row',
  },
  typeImage: {
    height: 45,
    width: 45,
    marginLeft: 30,
  }
});

export default PokemonCard;
