import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: "", pathMatch : 'full', component: CarComponent},
  {path: "cars", component: CarComponent},
  {path: "cars/brand/:brandID", component: CarComponent},
  {path: "cars/color/:colorID", component: CarComponent},
  {path: "cars/detail/:carID", component: CarDetailComponent},
  {path:"payments", component:PaymentComponent},
  {path:"brands/brandList",component:BrandListComponent, canActivate:[LoginGuard]},
  {path:"colors/colorList",component:ColorListComponent, canActivate:[LoginGuard]},

  {path:"cars/carList",component:CarListComponent, canActivate:[LoginGuard]},
  {path:"cars/carList/carAdd", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/carList/carUpdate/:carID", component:CarUpdateComponent  },

  {path:"login", component:LoginComponent  },
  {path:"register", component:RegisterComponent  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
