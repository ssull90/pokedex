export const putPokemonList = (pokemonList) => dispatch => {
    dispatch({
     type: 'PUT_POKEMON_LIST',
     pokemonList: pokemonList
    })
   }