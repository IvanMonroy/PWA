import { Component, Input, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, combineLatest, SubscriptionLike } from 'rxjs';
import { GlobalThingsService } from '../../services/global/global-things.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-vehicle',
  template: `
  <div class="container-fluid">  
<mat-form-field appearance="legacy">
<mat-label class="span_color_black">Buscar por placa</mat-label>
<input matInput [name]="filter" [formControl]="filter" placeholder="AAA-123" autocomplete="off">
</mat-form-field>
</div>

<div class="container">
<div *ngIf="undefined === vehiclesFiltered">
<mat-progress-spinner class="example-margin" [mode]="mode" [value]="value">
</mat-progress-spinner>
</div>
</div>


<div *ngIf="undefined !== vehiclesFiltered" class="container-fluid">
<div class="row">  
<mat-list class="col-12">
      <h3 mat-subheader>Vehículos </h3>
      <div class="col-xl-3 col-lg-4 col-md-5 col-sm-6  d-inline-flex" *ngFor="let product of vehiclesFiltered | async" style="margin-bottom: 1.5rem;">
      <mat-list-item >
        <mat-icon mat-list-icon>directions_car</mat-icon>
        <h4 class="main_data" mat-line>{{product.plate}}</h4>
        <p mat-line class="text-wrap"> {{product.brand + ', Cantidad entradas: ' + product.total_entries}} </p>
      </mat-list-item>
    </div>
    </mat-list>
  </div>
</div>
  `,
  styleUrls: ["./pages.scss"]

})
export class VehicleComponent implements OnDestroy {
  title = 'app';
  vehicles: Observable<any[]>;
  vehiclesFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  model = 'vehicles';
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  subscription: SubscriptionLike;

  constructor(
    private globalService: GlobalThingsService,
    private http: HttpClient,

  ) {
    this.vehicles = this.globalService.GetAllModel(this.model)
    console.log(this.vehicles);
    this.vehiclesFiltered = this.globalService.GetAllModel(this.model)
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.vehiclesFiltered = combineLatest(this.vehicles, this.filter$).pipe(
      map(([vehicles, filterString]) => vehicles['data'].filter(vehicle => vehicle.plate.indexOf(filterString) !== -1))
    )
    this.subscription = this.vehicles.subscribe()
    console.log("Subscription vehicles: " + this.subscription.closed);
    document.title = 'Vehículos';
    localStorage.setItem("vehicles", JSON.stringify(this.vehiclesFiltered));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

}



@Component({
  selector: 'app-entries',
  template: `
  <div class="container-fluid">  
<mat-form-field appearance="legacy">
<mat-label class="span_color_black">Buscar por placa</mat-label>
<input matInput [name]="filter" [formControl]="filter" placeholder="AAA-123" autocomplete="off">
</mat-form-field>
</div>

<div class="container">
<div *ngIf="undefined === entriesFiltered">
<mat-progress-spinner class="example-margin" [mode]="mode" [value]="value">
</mat-progress-spinner>
</div>
</div>


<div *ngIf="undefined !== entriesFiltered" class="container-fluid">
<div class="row">  
<mat-list class="col-12">
      <h3 mat-subheader>Entradas </h3>
      <div class="col-xl-3 col-lg-4 col-md-5 col-sm-6  d-inline-flex" *ngFor="let product of entriesFiltered | async" style="margin-bottom: 1.5rem;">
      <mat-list-item >
        <mat-icon mat-list-icon>departure_board</mat-icon>
        <h4 class="main_data" mat-line>{{product.plate}}</h4>
        <p mat-line class="text-wrap"> {{ 'Hora de entrada: ' + product.date_arrival + ' ' +  product.hour_arrival + ', Lugar: ' + product.place}} </p>
      </mat-list-item>
    </div>
    </mat-list>
  </div>
</div>
  `,
  styleUrls: ["./pages.scss"]

})
export class EntriesComponent implements OnDestroy {
  title = 'app';
  entries: Observable<any[]>;
  entriesFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  model = 'entries';
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  subscription: SubscriptionLike;

  constructor(
    private globalService: GlobalThingsService,
    private http: HttpClient,

  ) {
    this.entries = this.globalService.GetAllModel(this.model)
    console.log(this.entries);
    this.entriesFiltered = this.globalService.GetAllModel(this.model)
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.entriesFiltered = combineLatest(this.entries, this.filter$).pipe(
      map(([entries, filterString]) => entries['data'].filter(entrie => entrie.plate.indexOf(filterString) !== -1))
    )
    this.subscription = this.entries.subscribe()
    console.log("Subscription entries: " + this.subscription.closed);
    document.title = 'Vehículos';
    localStorage.setItem("entries", JSON.stringify(this.entriesFiltered));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

}



@Component({
  selector: 'app-exits',
  template: `
  <div class="container-fluid">  
<mat-form-field appearance="legacy">
<mat-label class="span_color_black">Buscar por placa</mat-label>
<input matInput [name]="filter" [formControl]="filter" placeholder="AAA-123" autocomplete="off">
</mat-form-field>
</div>

<div class="container">
<div *ngIf="undefined === exitsFiltered">
<mat-progress-spinner class="example-margin" [mode]="mode" [value]="value">
</mat-progress-spinner>
</div>
</div>


<div *ngIf="undefined !== exitsFiltered" class="container-fluid">
<div class="row">  
<mat-list class="col-12">
      <h3 mat-subheader>Salidas </h3>
      <div class="col-xl-3 col-lg-4 col-md-5 col-sm-6  d-inline-flex" *ngFor="let product of exitsFiltered | async" style="margin-bottom: 1.5rem;">
      <mat-list-item >
        <mat-icon mat-list-icon>airport_shuttle</mat-icon>
        <h4 class="main_data" mat-line>{{product.get_plate}}</h4>
        <p mat-line class="text-wrap"> {{ 'Hora de salida: ' + product.time_exit_format + ', Tiempo total: ' +  product.total_time + ', Paga: $' + product.ammount_to_paid}} </p>
      </mat-list-item>
    </div>
    </mat-list>
  </div>
</div>
  `,
  styleUrls: ["./pages.scss"]

})
export class ExitsComponent implements OnDestroy {
  title = 'app';
  exits: Observable<any[]>;
  exitsFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  model = 'exits';
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  subscription: SubscriptionLike;

  constructor(
    private globalService: GlobalThingsService,
    private http: HttpClient,

  ) {
    this.exits = this.globalService.GetAllModel(this.model)
    console.log(this.exits);
    this.exitsFiltered = this.globalService.GetAllModel(this.model)
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.exitsFiltered = combineLatest(this.exits, this.filter$).pipe(
      map(([exits, filterString]) => exits['data'].filter(exit => exit.get_plate.indexOf(filterString) !== -1))
    )
    this.subscription = this.exits.subscribe()
    console.log("Subscription exits: " + this.subscription.closed);
    localStorage.setItem("exits", JSON.stringify(this.exitsFiltered));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

}


@Component({
  selector: 'app-rates',
  template: `
  <div class="container-fluid">  
<mat-form-field appearance="legacy">
<mat-label class="span_color_black">Buscar por nombre</mat-label>
<input matInput [name]="filter" [formControl]="filter" placeholder="Camionetas" autocomplete="off">
</mat-form-field>
</div>

<div class="container">
<div *ngIf="undefined === ratesFiltered">
<mat-progress-spinner class="example-margin" [mode]="mode" [value]="value">
</mat-progress-spinner>
</div>
</div>


<div *ngIf="undefined !== ratesFiltered" class="container-fluid">
<div class="row">  
<mat-list class="col-12">
      <h3 mat-subheader>Salidas </h3>
      <div class="col-xl-3 col-lg-4 col-md-5 col-sm-6  d-inline-flex" *ngFor="let product of ratesFiltered | async" style="margin-bottom: 1.5rem;">
      <mat-list-item >
        <mat-icon mat-list-icon>monetization_on</mat-icon>
        <h4 class="main_data" mat-line>{{product.name + ' $' + product.value  }}</h4>
        <p mat-line class="text-wrap"> {{ product.description }} </p>
      </mat-list-item>
    </div>
    </mat-list>
  </div>
</div>
  `,
  styleUrls: ["./pages.scss"]

})
export class RateComponent implements OnDestroy {
  title = 'app';
  rates: Observable<any[]>;
  ratesFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  model = 'rates';
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  subscription: SubscriptionLike;

  constructor(
    private globalService: GlobalThingsService,
    private http: HttpClient,

  ) {
    this.rates = this.globalService.GetAllModel(this.model)
    console.log(this.rates);
    this.ratesFiltered = this.globalService.GetAllModel(this.model)
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.ratesFiltered = combineLatest(this.rates, this.filter$).pipe(
      map(([rates, filterString]) => rates['data'].filter(rate => rate.name.indexOf(filterString) !== -1))
    )
    this.subscription = this.rates.subscribe()
    console.log("Subscription rates: " + this.subscription.closed);
    localStorage.setItem("rates", JSON.stringify(this.ratesFiltered));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

}
