import { PokemonName } from '@tambo/shared';
import { Pokemon } from './pokemon.model';

export type PokemonsState = Record<PokemonName, Pokemon>;
