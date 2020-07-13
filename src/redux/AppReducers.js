export default (state = {}, action) => {
    switch (action.type) {
     case 'PUT_POKEMON_LIST':
      return {
       pokemonList: action.pokemonList
      }
     default:
      return state
    }
   }