import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './main/components/register/register.component';
import { LoginComponent } from './main/components/login/login.component';
import { MovieTableComponent } from './table/components/movie-table/movie-table.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'table',
    loadChildren: () => import('./table/table.module').then((m) => m.TableModule)
  },
  {
    path: 'table/movies',
    component: MovieTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
