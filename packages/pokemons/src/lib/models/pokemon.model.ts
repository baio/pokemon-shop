export type PokemonName = string;
export type Price = number;

export interface PokemonBase {
  name: PokemonName;
}

export interface Pokemon extends PokemonBase {
  imageUrl: string;
  price: Price;
}
