import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StarWarsService } from '../swapi.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  movies: string[] = [];
  species: string[] = [];
  vehicles: string[] = [];
  starships: string[] = [];
  birthYears: string[] = ['All', '30 BBY', '20 BBY', '10 BBY', '0 BBY', '5 ABY'];

  selectedMovie: string | null = null;
  selectedSpecies: string | null = null;
  selectedVehicle: string | null = null;
  selectedStarship: string | null = null;
  selectedBirthYear: string | null = null;

  @Output() filtersChanged = new EventEmitter<any>();

  constructor(private starWarsService: StarWarsService) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    this.starWarsService.getFilms().subscribe(films => {
      this.movies = films.map((film: any) => film.title);
    });

    this.starWarsService.getStarships().subscribe(starships => {
      this.starships = starships.map((starship: any) => starship.name);
    });

    this.starWarsService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles.map((vehicle: any) => vehicle.name);
    });

    this.starWarsService.getSpecies().subscribe(species => {
      this.species = species.map((specie: any) => specie.name);
    });
  }

  applyFilters() {
    this.filtersChanged.emit({
      movie: this.selectedMovie,
      species: this.selectedSpecies,
      vehicle: this.selectedVehicle,
      starship: this.selectedStarship,
      birthYear: this.selectedBirthYear
    });
  }
}
