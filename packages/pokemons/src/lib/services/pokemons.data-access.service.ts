import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonBase } from '../models/pokemon.model';
import { Observable, map } from 'rxjs';
import { PokemonsList } from '../models/pokemons-list.model';

interface PokemonsListDto {
  count: number;
  next: string;
  previous: null;
  results: ResultDto[];
}

interface ResultDto {
  name: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class PokemonsDataAccessService {
  constructor(private readonly http: HttpClient) {}

  getList(pageIndex: number, pageSize: number): Observable<PokemonsList> {
    // TODO: base url through config
    return this.http
      .get<PokemonsListDto>(
        `https://pokeapi.co/api/v2/pokemon?offset=${pageIndex}&limit=${pageSize}`
      )
      .pipe(
        // as Pokemon - pretend for type system all data already in result
        map(({ count, results }) => ({ count, items: results as Pokemon[] }))
      );
  }
}
