import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

const routes: Routes = [
  // { path: '', component: CharacterListComponent },
  // { path: 'characters/:id', component: CharacterDetailComponent }
  { path: '', redirectTo: '/characters', pathMatch: 'full' }, // Redirect to character list
  { path: 'characters', component: CharacterListComponent }, // Route to character list
  { path: 'character/:id', component: CharacterDetailComponent }, // Route with parameter for details
  { path: '**', redirectTo: '/characters' } // Wildcard route for undefined paths
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }