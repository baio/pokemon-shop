import { DateTime, PokemonName } from '@tambo/shared';

export type CartState = Record<PokemonName, DateTime>;

export interface PokemonInCart {
  isInCart: boolean;
}
