import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';

import { from } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { ToastrService } from 'ngx-toastr';
import { RentService } from 'src/app/services/rent.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars : Car[] = [];
  carImageBasePath = "https://localhost:44350/images/";
  carFilter:" ";

  brands:Brand[];
  colors:Color[];
  colorID:number;
  brandID:number;
  

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private rentService: RentService) { }

  ngOnInit(): void {

      this.activatedRoute.params
        .subscribe((params) => {
          if(params["brandID"]){
            this.getCarsByBrand(params["brandID"]);
          }
          else if(params["colorID"]){
            this.getCarsByColor(params["colorID"]);
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

  getCarImage(cars:Car){

    if(cars.imagePath){
      return cars.imagePath
    }
    else{
      return 'default.jpg'
    }
  }

  rentCar(car: Car) {
    this.toastrService.success('Araç Kiralandı', car.carName);
    this.rentService.rentCar(car);
  }

  getSelectedBrand(id:number){
    if (this.brandID == id)
    {
      return true;
    }
     else
    {
      return false;
    }
  }
  
  getSelectedColor(id:number){
    if (this.colorID == id) 
    {
      return true;
    } 
    else 
    {
      return false;
    }
  }
   getCarsByFilter(brandID:number,colorID:number){
    this.carService.getCarsByFilter(brandID,colorID).subscribe(response=>{
      this.cars=response.data;
    });
  }

}
