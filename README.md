# Pokemons shop

Project use [nx](https://nx.dev/) for project structure,  [ngrx](https://ngrx.io/) as store manager and [ng-zorro](https://ng.ant.design/docs/introduce/en) as ui library

## Getting started

```
npm install
npm start
```

## Project structure

Project uses nx structure with following  modules
+ `packages`
  + `pokemon-shop` - main application
  + `shared` - contains chared models
  + `pokemons` - ui for pokemons feature
  + `cart` - ui for cart feature
  + `store/cart` - ngrx store with models and data access layer
  + `store/pokemons` - ngrx store with models

## Improved project structure

For bigger project I would use the following structure (which requires more slicing)

+ `packages`
  + `pokemon-shop` - main application
  + `shared` 
    + `models` - contains chared models
  + `pokemons` - pokemons feature  
    + `models` - feature models
    + `ui` - feature ui components
    + `store` - feature store
    + `data-access` - feature data access layer
  + `cart` - ui for cart feature
    + `models` - feature models
    + `ui` - feature ui components
    + `store` - feature store
    + `data-access` - feature data access layer


