
import React, { createContext, useContext, useState } from 'react';

// create 2 part context: containing provider and consumer
const PokemonContext = createContext();

/* 
make the provider and export it. It will use useState to save the selected pokemon in selectedPokemon state. 
setSelectedPokemon is used to update the selectedPokemon
*/
export const PokemonProvider = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // this means that any component wrapped inside will have access to selectedPokemon and setSelectedPokemon through usePokemonContext
  return (
    <PokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

// this is the function used to connect to context hook from other components
export const usePokemonContext = () => {
  return useContext(PokemonContext);
};
