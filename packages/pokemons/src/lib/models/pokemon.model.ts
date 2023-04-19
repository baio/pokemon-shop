export type PokemonName = string;

export interface PokemonBase {
  name: PokemonName;
  url: string;
}

export interface Pokemon extends PokemonBase {
  imageUrl: string;
}
