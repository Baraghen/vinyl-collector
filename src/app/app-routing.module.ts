import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { LibraryComponent } from './components/library/library.component';
import { WishListComponent } from './components/wish-list/wish-list.component';


const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'wish-list', component: WishListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SearchComponent, LibraryComponent, WishListComponent];
