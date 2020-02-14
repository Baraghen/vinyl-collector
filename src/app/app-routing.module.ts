import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { LibraryComponent } from './components/library/library.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'library', component: LibraryComponent, canActivate: [AuthGuard] },
  { path: 'wish-list', component: WishListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, SearchComponent, LibraryComponent, WishListComponent];
