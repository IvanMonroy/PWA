import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehicleComponent, EntriesComponent, ExitsComponent, RateComponent, IndexComponent} from './pages/pages/vehicle'

const routes: Routes = [{
  path: "vehicles",
  component: VehicleComponent,
  data: { title: "Vehículos" }
},
{
  path: "entries",
  component: EntriesComponent,
  data: { title: "Entradas" }
},
{
  path: "exits",
  component: ExitsComponent,
  data: { title: "Salidas" }
},
{
  path: "rates",
  component: RateComponent,
  data: { title: "Tarifas" }
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