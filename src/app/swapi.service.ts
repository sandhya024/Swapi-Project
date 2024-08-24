
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Character } from './character-detail/character-detail.component';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  private peopleUrl = 'https://swapi.dev/api/people/';
  private filmsUrl = 'https://swapi.dev/api/films/';
  private starshipsUrl = 'https://swapi.dev/api/starships/';
  private vehiclesUrl = 'https://swapi.dev/api/vehicles/';
  private speciesUrl = 'https://swapi.dev/api/species/';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<any[]> {
    return this.http.get<any>(this.peopleUrl).pipe(
      map(response => response.results),
      catchError(this.handleError<any[]>('getPeople', []))
    );
  }

  getFilms(): Observable<any[]> {
    return this.http.get<any>(this.filmsUrl).pipe(
      map(response => response.results),
      catchError(this.handleError<any[]>('getFilms', []))
    );
  }

  getStarships(): Observable<any[]> {
    return this.http.get<any>(this.starshipsUrl).pipe(
      map(response => response.results),
      catchError(this.handleError<any[]>('getStarships', []))
    );
  }

  getVehicles(): Observable<any[]> {
    return this.http.get<any>(this.vehiclesUrl).pipe(
      map(response => response.results),
      catchError(this.handleError<any[]>('getVehicles', []))
    );
  }

  getSpecies(): Observable<any[]> {
    return this.http.get<any>(this.speciesUrl).pipe(
      map(response => response.results),
      catchError(this.handleError<any[]>('getSpecies', []))
    );
  }

  getCharacter(id: string): Observable<any> { // Change parameter type to string
    return this.http.get<any>(`${this.peopleUrl}${id}/`).pipe(
      catchError(this.handleError<any>(`getCharacter id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}

