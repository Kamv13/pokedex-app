import { Injectable } from '@angular/core';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  async getPokemonList(limit = 20, offset = 0): Promise<Pokemon[]> {
    const res = await fetch(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();

    const pokemonList = await Promise.all(
      data.results.map((p: any) => fetch(p.url).then(r => r.json()))
    );

    return pokemonList.map(p => ({
      id: p.id,
      name: p.name,
      image: p.sprites.other['official-artwork'].front_default,
      types: p.types.map((t: any) => t.type.name)
    }));
  }
}