import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieTableComponent } from './components/movie-table/movie-table.component';

const routes: Routes = [
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
