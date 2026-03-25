import { Component, OnInit, signal } from '@angular/core';
import { PokemonService, Pokemon } from './pokemon/pokemon';
import { PokemonCardComponent } from './pokemon/pokemon-card/pokemon-card';

@Component({
  selector: 'app-root',
  imports: [PokemonCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  pokemonList = signal<Pokemon[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    try {
      this.pokemonList.set(await this.pokemonService.getPokemonList(20));
    } catch {
      this.error.set('Failed to load Pokémon. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}