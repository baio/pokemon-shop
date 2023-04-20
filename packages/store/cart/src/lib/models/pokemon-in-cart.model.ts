import { Pokemon } from '@tambo/store/pokemons';

export interface PokemonInCart extends Pokemon {
  isInCart: boolean;
}
