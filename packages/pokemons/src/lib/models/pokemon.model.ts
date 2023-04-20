import { PokemonName, Price } from '@tambo/shared';

export interface PokemonBase {
  name: PokemonName;
}

export interface Pokemon extends PokemonBase {
  imageUrl: string;
  price: Price;
}
