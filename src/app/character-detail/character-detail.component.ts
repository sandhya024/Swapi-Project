import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarWarsService } from '../swapi.service';
import { HttpClient } from '@angular/common/http';

export interface Character {
  id: number;
  name: string;
  hair_color: string;
  gender: string;
  height: string;
  mass: string;
  skin_color: string;
  eye_color: string;
  films: string[];  // URLs of films
  vehicles: string[];  // URLs of vehicles
  starships: string[];  // URLs of starships
  birth_year: string;
}

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  @Input() character: any;
  movies: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];
  characterId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private starWarsService: StarWarsService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterId = id;
      this.starWarsService.getCharacter(this.characterId).subscribe((data: any) => {
        this.character = data;
        this.loadRelatedDetails(); // Load related details once character data is fetched
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['character'] && this.character) {
      this.loadRelatedDetails();
    }
  }

  private loadRelatedDetails() {
    this.movies = [];
    this.vehicles = [];
    this.starships = [];

    if (this.character) {
      // Fetch movies
      this.character.films.forEach((filmUrl: string) => {
        this.http.get(filmUrl).subscribe((data: any) => this.movies.push(data));
      });

      // Fetch vehicles
      this.character.vehicles.forEach((vehicleUrl: string) => {
        this.http.get(vehicleUrl).subscribe((data: any) => this.vehicles.push(data));
      });

      // Fetch starships
      this.character.starships.forEach((starshipUrl: string) => {
        this.http.get(starshipUrl).subscribe((data: any) => this.starships.push(data));
      });
    }
  }

  backHome() {
    this.router.navigate(['/']);
  }
}