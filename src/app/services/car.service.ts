import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44350/api/cars/";

  constructor(private httpClient: HttpClient) { }

  getCars() : Observable<ListResponseModel<Car>>{

    let newApiUrl = this.apiUrl + "getbydetails";

    return this.httpClient
    .get<ListResponseModel<Car>>(newApiUrl);
  }

  getCarsByBrand(brandID: number) : Observable<ListResponseModel<Car>>{
    let newApiUrl = this.apiUrl + "getbybrand?brandId=" + brandID;

    return this.httpClient
      .get<ListResponseModel<Car>>(newApiUrl);
  }

  getCarsByColor(colorID: number): Observable<ListResponseModel<Car>>{
    let newApiUrl = this.apiUrl + "getbycolor?colorId=" + colorID;

    return this.httpClient
      .get<ListResponseModel<Car>>(newApiUrl);
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "addcar", car)
  }

  getCarsByFilter(brandID:number,colorID:number): Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcarfilter?brandId="+brandID+"&colorId="+colorID;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsById(carID:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"GetDetailById?carID="+carID;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

   deleteCar(car:Car):Observable<ResponseModel>{
   let newPath=this.apiUrl+"deletecar";
   return this.httpClient.post<ResponseModel>(newPath,car);
   }
   updateCar(car:Car):Observable<ResponseModel>{
   let newPath=this.apiUrl+"updatecar";
   return this.httpClient.post<ResponseModel>(newPath,car);
   }
}
