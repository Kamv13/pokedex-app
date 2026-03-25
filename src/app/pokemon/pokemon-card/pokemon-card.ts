import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-card',
  imports: [TitleCasePipe],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css'
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
}