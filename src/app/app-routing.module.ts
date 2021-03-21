import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [
  {path: "", pathMatch : 'full', component: CarComponent},
  {path: "cars", component: CarComponent},
  {path: "cars/brand/:brandID", component: CarComponent},
  {path: "cars/color/:colorID", component: CarComponent},
  {path: "cars/detail/:carID", component: CarDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
