import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tambo-pokemons-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent {}
