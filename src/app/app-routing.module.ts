import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path: "", pathMatch : 'full', component: CarComponent},
  {path: "cars", component: CarComponent},
  {path: "cars/brand/:brandID", component: CarComponent},
  {path: "cars/color/:colorID", component: CarComponent},
  {path: "cars/detail/:carID", component: CarDetailComponent},
  {path:"payments", component:PaymentComponent},
  {path:"cars/add", component:CarAddComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
