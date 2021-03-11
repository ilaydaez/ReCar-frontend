import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { HttpClient } from '@angular/common/http';
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { from } from 'rxjs';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[]=[];
  apiUrl="https://localhost:44350/api/cars/getall"
  //carResponseModel:CarResponseModel={};

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  getCars(){
    this.httpClient.get<CarResponseModel>(this.apiUrl).subscribe(reponse=>{
      
    });

  }

}
