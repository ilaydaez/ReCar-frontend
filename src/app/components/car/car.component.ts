import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';

import { from } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars : Car[] = [];
  carImageBasePath = "https://localhost:44350/api/images";
  carNameFilter = "";

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

      this.activatedRoute.params
        .subscribe((params) => {
          if(params["brandId"]){
            this.getCarsByBrand(params["brandId"]);
          }
          else if(params["colorId"]){
            this.getCarsByColor(params["colorId"]);
          }
          else{
            this.getCars();
          }
        });
  }

  getCars(){
    this.carService.getCars()
      .subscribe(response => {
        this.cars = response.data;
      });
  }

  getCarsByBrand(brandID: number){
    this.carService.getCarsByBrand(brandID)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }

  getCarsByColor(colorID: number){
    this.carService.getCarsByColor(colorID)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }

  getCarImage(car:Car){

    if(car.imagePath){
      return car.imagePath
    }
    else{
      return 'default.jpg'
    }
  }

}
