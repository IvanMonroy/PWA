import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, combineLatest, SubscriptionLike } from 'rxjs';
import { GlobalThingsService } from '../../services/global/global-things.service';
import { DashboardService } from '../../services/customizing/dashboard.service';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { PagesFormsComponent } from '../pages-forms/pages-forms/pages-forms.component';
import { MessageResponse } from 'src/app/navigator/nav-dashboard/nav-menu/sub-menu';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Component({
  selector: 'app-index',
  template: `
  <div class=" img-fluid jumbotron"
    style="background: url('../../assets/icons/night_city_city_lights_underground_136558_1920x1080.jpg')fixed">

    <h1 class="display-4">Bienvenido, HR Parking!</h1>
    <p class="lead">Encuentra de manera fácil un espacio seguro para tu vehículo en la red de parqueaderos HR.</p>
    <hr class="my-4">
    <p>Disfruta de la experiencia de parquear en HR.</p>
    <button class="button btn btn-primary btn-lg">
        <mat-icon class="first-icon" mat-list-icon [routerLink]="['/entries']" role="button">reply</mat-icon>
        <mat-icon class="second-icon" mat-list-icon [routerLink]="['/entries']" role="button">reply_all</mat-icon>
    </button>
</div>

<div class="container-fluid">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12  d-inline-flex">
        <ul class="list-unstyled">
            <li class="media">
                <mat-icon class="mr-3" mat-list-icon>whatshot</mat-icon>
                <div class="media-body">
                    <h5 class="mt-0 mb-1">Muchas personas ya usan ParkingIHR</h5>

                </div>
            </li>
        </ul>
    </div>
</div>

<div class="container-fluid " style="margin-bottom: 2rem;">
    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex text-center">
        <div class="circle">
            <p> {{statistics.vehicles}} </p>
        </div>
        <small> Vehículos con nosotros. </small>
    </div>

    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex text-center">
        <div class="circle">
            <p> {{statistics.entries}} </p>
        </div>
        <small>Entradas registradas.</small>
    </div>

    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex text-center">
        <div class="circle">
            <p> {{statistics.exits}} </p>
        </div>
        <small>Salidas exitosas.</small>
    </div>

    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex text-center">
        <div class="circle">
            <p> {{statistics.rates}} </p>
        </div>
        <small>Tarifas para tí.</small>
    </div>
</div>

<div class=" img-fluid jumbotron text-right"
    style="background: url('../../assets/index_images/save-on-pig.jpg') fixed;">
    <h1 class="display-4">Más formas de ahorrar!</h1>
    <p class="lead">Con nuestras tarifas no tienes que preocuparte por pagar un peso de más.</p>
    <p>Conoce más sobre nuestras tarifas.</p>
    <button class="button btn btn-primary btn-lg">
        <mat-icon class="first-icon" mat-list-icon [routerLink]="['/entries']" role="button">monetization_on</mat-icon>
        <mat-icon class="second-icon" mat-list-icon [routerLink]="['/entries']" role="button">loyalty</mat-icon>
    </button>
</div>


<div class="container-fluid">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12  d-inline-flex">
        <ul class="list-unstyled">
            <li class="media">
                <mat-icon class="mr-3" mat-list-icon>star</mat-icon>
                <div class="media-body">
                    <h5 class="mt-0 mb-1">Conoce más sobre nosotros</h5>
                </div>
            </li>
        </ul>
    </div>
</div>

<div class="container-fluid">
    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex">
        <img src="../../assets/index_images/shutterstock_601718561.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">DESPREOCÚPATE </h5>
            <p class="card-text">Con nuestra red de parqueaderos privados, te garantizamos la seguridad de tu vehículo.
            </p>
            <button class="button btn btn-primary btn-lg">
                <mat-icon class="first-icon" mat-list-icon role="button">add</mat-icon>
                <mat-icon class="second-icon" mat-list-icon role="button">clear</mat-icon>
            </button>
        </div>
    </div>

    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex">
        <img src="../../assets/index_images/Active8me-Save-Time-Healthy-Living-Hacks-for-Busy-People.jpg"
            class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">DÓNDE Y CUANDO QUIERAS</h5>
            <p class="card-text">No des más vueltas buscando parqueadero, con Queo elije donde estacionarte y vive una
                mejor experiencia.</p>
            <button class="button btn btn-primary btn-lg">
                <mat-icon class="first-icon" mat-list-icon role="button">add</mat-icon>
                <mat-icon class="second-icon" mat-list-icon role="button">clear</mat-icon>
            </button>
        </div>
    </div>

    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex">
        <img src="../../assets/index_images/save-money.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">AHORRA SIEMPRE</h5>
            <p class="card-text">Haz parte de nuestra red y gana dinero arrendando tu parqueadero.</p>
            <button class="button btn btn-primary btn-lg">
                <mat-icon class="first-icon" mat-list-icon role="button">add</mat-icon>
                <mat-icon class="second-icon" mat-list-icon role="button">clear</mat-icon>
            </button>
        </div>
    </div>

    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex">
        <img src="../../assets/index_images/siempre-contigo.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">SIEMPRE CONTIGO</h5>
            <p class="card-text">Nuestras tarifas son menores a las de los parqueaderos convencionales.</p>
            <button class="button btn btn-primary btn-lg">
                <mat-icon class="first-icon" mat-list-icon role="button">add</mat-icon>
                <mat-icon class="second-icon" mat-list-icon role="button">clear</mat-icon>
            </button>
        </div>
    </div>

    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex">
        <img src="../../assets/index_images/easy.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">FÁCIL</h5>
            <p class="card-text">Ubica el parqueadero, paga en línea y estaciona.</p>
            <button class="button btn btn-primary btn-lg">
                <mat-icon class="first-icon" mat-list-icon role="button">add</mat-icon>
                <mat-icon class="second-icon" mat-list-icon role="button">clear</mat-icon>
            </button>
        </div>
    </div>

    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex">
        <img src="../../assets/index_images/parking.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">SEIMPRE PENSANDO EN TÍ</h5>
            <p class="card-text">En Parking tu bici es bienvenida. Tenemos el sello calidad bici oro en 3 de nuestros
                estacionamientos.</p>
            <button class="button btn btn-primary btn-lg">
                <mat-icon class="first-icon" mat-list-icon [routerLink]="['/entries']" role="button">add</mat-icon>
                <mat-icon class="second-icon" mat-list-icon [routerLink]="['/entries']" role="button">clear</mat-icon>
            </button>
        </div>
    </div>

    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex">
        <img src="../../assets/index_images/easy.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">MEJOR QUE COMO LO DEJASTE</h5>
            <p class="card-text">Te ofrecemos en varios de nuestros parqueaderos la oportunidad de lavar tu carro
                mientras está bajo nuestro cuidado. Disfruta de este servicio y no te arrepentirás.
            </p>
            <button class="button btn btn-primary btn-lg">
                <mat-icon class="first-icon" mat-list-icon role="button">add</mat-icon>
                <mat-icon class="second-icon" mat-list-icon role="button">clear</mat-icon>
            </button>
        </div>
    </div>

    <div class="card col-xl-3 col-lg-4 col-md-5 col-sm-6 d-inline-flex">
        <img src="../../assets/index_images/save.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">NO TE PREOCUPES POR TU CARRO </h5>
            <p class="card-text">Parking resuelve ese problema. Contamos con un equipo profesional y tecnología de punta
                para prestar un servicio de Valet Parking con responsabilidad.
            </p>
            <button class="button btn btn-primary btn-lg">
                <mat-icon class="first-icon" mat-list-icon role="button">add</mat-icon>
                <mat-icon class="second-icon" mat-list-icon role="button">clear</mat-icon>
            </button>
        </div>
    </div>
</div>
  `,
  styleUrls: ["./index.scss"]

})
export class IndexComponent implements OnDestroy {
  title = 'app';
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  statistics: any;
  subscription: SubscriptionLike;
  constructor(
    private dashboardService: DashboardService,
    private http: HttpClient,
  ) {
    this.subscription = this.dashboardService.getMethod().subscribe((data: any[]) => {
      console.log(data['data'][0]);
      this.statistics = data['data'][0];
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

}


@Component({
  selector: 'app-vehicle',
  template: `
  <div class="container-fluid">
    <mat-form-field appearance="legacy">
        <mat-label class="span_color_black">Buscar por placa</mat-label>
        <input matInput [name]="filter" [formControl]="filter" placeholder="AAA-123" autocomplete="off"
            data-toggle="tooltip" data-placement="right" title="El formulario es sensible a máyusculas y mínusculas.">
    </mat-form-field>
</div>

<div class="container">
    <div *ngIf="undefined === dataFiltered">
        <mat-progress-spinner class="example-margin" [mode]="mode" [value]="value">
        </mat-progress-spinner>
    </div>
</div>
<a (click)="openDialog()" class="float">
    <mat-icon class="my-float" mat-list-icon>add</mat-icon>
</a>
<div *ngIf="undefined !== dataFiltered" class="container-fluid">
    <div class="row">
        <mat-list class="col-12">
            <h3 mat-subheader>{{tittle}} </h3>
            <div class="col-xl-3 col-lg-4 col-md-5 col-sm-6  d-inline-flex"
                *ngFor="let product of dataFiltered | async" style="margin-bottom: 1.5rem;">
                <mat-list-item>
                    <mat-icon mat-list-icon>{{icon}}</mat-icon>
                    <div class="mat-list-text">
                        <ng-template [ngIf]="model == 'vehicles'">

                            <h4 class="main_data" mat-line>{{product.plate}} <small>
                                    <mat-icon id="delete" (click)="deleteRegister(product.id)">delete_outline</mat-icon>
                                </small></h4>
                            <p mat-line class="text-wrap"> {{ 'Marca: ' + product.brand}} </p>
                            <p mat-line class="text-wrap"> {{ 'Cantidad entradas: ' + product.total_entries}} </p>
                        </ng-template>
                        <ng-template [ngIf]="model == 'entries'">
                            <h4 class="main_data" mat-line>{{product.plate}} <small>
                                    <mat-icon id="delete" (click)="deleteRegister(product.id)">delete_outline</mat-icon>
                                </small> </h4>
                            <p mat-line class="text-wrap">
                                {{ 'Hora de entrada: ' + product.date_arrival + ' ' +  product.hour_arrival + ', Lugar: ' + product.place}}
                            </p>
                        </ng-template>
                        <ng-template [ngIf]="model == 'exits'">
                            <h4 class="main_data" mat-line>{{product.get_plate}} <small>
                                    <mat-icon id="delete" (click)="deleteRegister(product.id)">delete_outline</mat-icon>
                                </small> <small>
                                    <mat-icon id="show_ticket" (click)="showTicket(product.id)">receipt</mat-icon>
                                </small></h4>
                            <p mat-line class="text-wrap">
                                {{ 'Hora de salida: ' + product.time_exit_format + ', Tiempo total: ' +  product.total_time + ', Paga: $' + product.ammount_to_paid}}
                            </p>
                        </ng-template>
                        <ng-template [ngIf]="model == 'rates'">
                            <h4 class="main_data" mat-line>{{product.name + ' $' + product.value  }} <small>
                                    <mat-icon id="delete" (click)="deleteRegister(product.id)">delete_outline</mat-icon>
                                </small></h4>
                            <p mat-line class="text-wrap"> {{ product.description }} </p>
                        </ng-template>
                    </div>
                </mat-list-item>
            </div>
        </mat-list>
    </div>
</div>
  `,
  styleUrls: ["./pages.scss"]

})
export class VehicleComponent implements OnInit, OnDestroy {
  title = 'app';
  data: Observable<any[]>;
  dataFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  model: string;
  icon: string;
  tittle: string;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  subscription: SubscriptionLike;
  newVehicle: Observable<any[]>;

  constructor(
    private globalService: GlobalThingsService,
    private dashboardService: DashboardService,
    private http: HttpClient,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.subscribe(data => {
    document.title = data.title,
      this.model = data.model,
      this.icon = data.items_icon,
      this.tittle = data.title
    });
  }

  ngOnInit() {
    this.data = this.globalService.GetAllModel(this.model)
    console.log(this.data);
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.dataFiltered = combineLatest(this.data, this.filter$).pipe(
      map(([datas, filterString]) => datas['data']
        .filter(data =>
          this.model == 'rates' ?
          data.name.indexOf(filterString) !== -1 : this.model == 'exits' ?
          data.get_plate.indexOf(filterString) !== -1 : data.plate.indexOf(filterString) !== -1
        ))
    )
    this.subscription = this.data.subscribe()
    console.log("Subscription " + this.tittle + this.subscription.closed);

  }

  showTicket(id) {
    this.dashboardService.showTicket(id).subscribe(
      (response) => response['data'] != undefined ? this.openResponse(response['data'], '350px') : this.openResponse(response['errors'], '350px') ,
    )
    this.ngOnInit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PagesFormsComponent, {
      width: '350px',
      data: { data: null, template: this.model }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  deleteRegister(id) {
    this.globalService.DeleteModel(this.model, id).subscribe(data => {
      this.openResponse(data['message'], '250px');
    }, err => {
      this.openResponse(err['error'].errors, '250px')
      console.log(err);
    })
    this.ngOnInit();
  }

  openResponse(message, size): void {
    const dialogRef = this.dialog.open(MessageResponse, {
      width: size,
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

}


