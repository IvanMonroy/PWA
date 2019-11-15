import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module'
import {GlobalThingsService} from '../services/global/global-things.service'
import {DashboardService} from '../services/customizing/dashboard.service'
import {MatProgressSpinnerModule,MatIconModule,MatListModule,MatFormFieldModule,MatInputModule, MatButtonModule,MatAutocompleteModule } from '@angular/material';
import {VehicleComponent, EntriesComponent, ExitsComponent, RateComponent, IndexComponent} from './pages/vehicle'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PagesFormsComponent } from './pages-forms/pages-forms/pages-forms.component'; 


@NgModule({
  declarations: [
    VehicleComponent,
    EntriesComponent,
    ExitsComponent,
    RateComponent,
    IndexComponent,
    PagesFormsComponent
  ],
  exports: [
    VehicleComponent,
    EntriesComponent,
    ExitsComponent,
    RateComponent,
    IndexComponent,
    PagesFormsComponent,
  ],
  entryComponents:  [
    PagesFormsComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,FormsModule, ReactiveFormsModule,MatInputModule,MatButtonModule,MatAutocompleteModule
    ,HttpClientModule
  ],
  providers: [GlobalThingsService, DashboardService]
})
export class PagesModule { }
