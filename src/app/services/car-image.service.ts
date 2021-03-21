import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44350/api/images/";
  constructor(private httpClient: HttpClient) { }

  getCarImageByCarId(carID: number): Observable<ListResponseModel<CarImage>>{
    let newApiUrl = this.apiUrl + "getallbycarid?id=" + carID;

    return this.httpClient.get<ListResponseModel<CarImage>>(newApiUrl);
  }
}
