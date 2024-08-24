import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarWarsService } from '../swapi.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  selectedCharacter: any;
  speciesCache: { [key: string]: string } = {}; // Cache to avoid repeated requests

  constructor(
    private starWarsService: StarWarsService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters() {
    this.starWarsService.getPeople().subscribe(data => {
      this.characters = data;
      this.filteredCharacters = data;

      // Fetch species names for each character
      this.characters.forEach(character => {
        this.fetchSpeciesNames(character);
      });
    });
  }

  fetchSpeciesNames(character: any) {
    const speciesUrls = character.species;
    const speciesRequests = speciesUrls.map((url: string) => {
      if (this.speciesCache[url]) {
        return Promise.resolve(this.speciesCache[url]);
      } else {
        return this.http.get(url).toPromise().then((data: any) => {
          this.speciesCache[url] = data.name;
          return data.name;
        });
      }
    });

    Promise.all(speciesRequests).then(speciesNames => {
      character.species = speciesNames; // Replace URLs with names
      this.filteredCharacters = [...this.filteredCharacters]; // Trigger change detection
    });
  }

  filterCharacters(filters: any) {
    const { movie, species, vehicle, starship, birthYear } = filters;
    
    this.filteredCharacters = this.characters.filter(character => {
      const matchesMovie = movie ? character.films.includes(movie) : true;
      const matchesSpecies = species ? character.species.includes(species) : true;
      const matchesVehicle = vehicle ? character.vehicles.includes(vehicle) : true;
      const matchesStarship = starship ? character.starships.includes(starship) : true;
      const matchesBirthYear = birthYear !== 'All' ? this.isYearInRange(character.birth_year, birthYear) : true;

      return matchesMovie && matchesSpecies && matchesVehicle && matchesStarship && matchesBirthYear;
    });
  }

  isYearInRange(birthYear: string, filterYear: string): boolean {
    // Implement conversion of birthYear and filterYear to check range
    return true; // Adjust this
  }

  viewCharacterDetails(character: any) {
    if (!character || !character.url) {
      console.error('Invalid character or URL:', character);
      return;
    }

    // Extract ID from URL
    const urlSegments = character.url.split('/');
    const id = urlSegments[urlSegments.length - 2];

    if (!id) {
      console.error('Invalid ID extracted from URL:', character.url);
      return;
    }
    
    this.router.navigate(['/character', id]);
  }
  


}
  