import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';

export let Router: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home',        component: HomeComponent },
  {path: '*',           component: HomeComponent }
];
