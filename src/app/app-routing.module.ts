import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehicleComponent, EntriesComponent, ExitsComponent, RateComponent, IndexComponent} from './pages/pages/vehicle'

const routes: Routes = [{
  path: "vehicles",
  component: VehicleComponent,
  data: { title: "Vehículos", items_icon: 'directions_car', model: 'vehicles' }
},
{
  path: "entries",
  component: VehicleComponent,
  data: { title: "Entradas", items_icon: 'departure_board', model: 'entries' }
},
{
  path: "exits",
  component: VehicleComponent,
  data: { title: "Salidas", items_icon: 'airport_shuttle', model: 'exits' }
},
{
  path: "rates",
  component: VehicleComponent,
  data: { title: "Tarifas", items_icon: 'monetization_on', model: 'rates' }
},
{
  path: "",
  component: IndexComponent,
  data: { title: "Inicio" }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }