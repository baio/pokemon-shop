import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonName } from '../models/pokemon.model';
import { Observable, map } from 'rxjs';
import { PokemonsList } from '../models/pokemons-list.model';
import { ItemDto } from './dto/item.dto';
import { ListDto } from './dto/list.dto';

@Injectable({ providedIn: 'root' })
export class PokemonsDataAccessService {
  constructor(private readonly http: HttpClient) {}

  getItem(name: PokemonName): Observable<Pokemon> {
    // TODO: base url through config
    return this.http
      .get<ItemDto>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(
        map((m) => ({
          name: m.name,
          imageUrl: m.sprites.front_default,
          // make price proportional to experience
          price: m.base_experience * 100,
        }))
      );
  }

  getList(pageIndex: number, pageSize: number): Observable<PokemonsList> {
    // TODO: base url through config
    return this.http
      .get<ListDto>(
        `https://pokeapi.co/api/v2/pokemon?offset=${pageIndex}&limit=${pageSize}`
      )
      .pipe(
        map(({ count, results }) => ({
          count,
          // as Pokemon - pretend for type system all data already in result
          items: results as unknown as Pokemon[],
        }))
      );
  }
}
