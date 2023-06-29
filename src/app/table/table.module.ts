import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieTableComponent } from './components/movie-table/movie-table.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from '../main/main-routing.module';


@NgModule({
  declarations: [
    MovieTableComponent,
    
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzTableModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    MainRoutingModule
  ]
})
export class TableModule { }
