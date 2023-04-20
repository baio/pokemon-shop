import { Pokemon } from './pokemon.model';

export interface PokemonsList<T extends Pokemon = Pokemon> {
  count: number;
  items: T[];
}
