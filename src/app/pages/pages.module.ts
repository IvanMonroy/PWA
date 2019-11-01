import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module'
import {GlobalThingsService} from '../services/global/global-things.service'
import {MatProgressSpinnerModule,MatIconModule,MatListModule,MatFormFieldModule,MatInputModule } from '@angular/material';
import {VehicleComponent, EntriesComponent, ExitsComponent, RateComponent} from './pages/vehicle'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [
    VehicleComponent,
    EntriesComponent,
    ExitsComponent,
    RateComponent
  ],
  exports: [
    VehicleComponent,
    EntriesComponent,
    ExitsComponent,
    RateComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,FormsModule, ReactiveFormsModule,MatInputModule
    ,HttpClientModule
  ],
  providers: [GlobalThingsService]
})
export class PagesModule { }
