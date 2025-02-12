import React, { createContext, useContext, useState } from 'react';
import initialPokemons from './Backend/ownPokemon';

// create 2 part context: containing provider and consumer
const OwnPokemonContext = createContext();

/* 
make the provider and export it. It will use useState to save the initial own pokemons to a list. 
set is used to update the own pokemon list
*/
export const OwnPokemonProvider = ({ children }) => {
    const [ownPokemonsCont, setOwnPokemonList] = useState(initialPokemons);


    // this to add new pokemon on list
    const addPokemon = (pokemonOrder) => {
        const pokemonExists = ownPokemonsCont.includes(pokemonOrder)

        if (!pokemonExists) {
            setOwnPokemonList([...ownPokemonsCont, pokemonOrder]);
            console.log("Added pokemon with order: ", pokemonOrder);
        } else {
            console.log("The pokemon is already found");
        }

    };

    // this just in case need to use remove here
    const removePokemon = (order) => {
        console.log("Current ownPokemonsCont: ", ownPokemonsCont);
        const updatedPokemons = ownPokemonsCont.filter((pokemon) => pokemon !== order);
        console.log("Updated ownPokemonsCont: ", updatedPokemons);
        setOwnPokemonList(updatedPokemons);
    };

    // this just in case need to update pokemon for some reason
    const updatePokemon = (updatedPokemonID) => {
        const updatedPokemons = ownPokemonsCont.map((pokemon) =>
            pokemon.id === updatedPokemons.id ? updatedPokemons : pokemon
        );
        setOwnPokemonList(updatedPokemons);
    };

    // this means that any component wrapped inside will have access to OwnPokemonContext
    return (
        <OwnPokemonContext.Provider value={{ ownPokemonsCont, setOwnPokemonList, addPokemon, removePokemon, updatePokemon }}>
            {children}
        </OwnPokemonContext.Provider>
    );
};

// this is the function used to connect to context hook from other components
export const useOwnPokemonContext = () => {
    return useContext(OwnPokemonContext);
};
