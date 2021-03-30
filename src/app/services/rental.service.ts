import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44350/api/";

  constructor(private httpClient:HttpClient) { }

  // getRentals():Observable<ListResponseModel<Rental>>{
  //   return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  // }

  getRentals():Observable<ListResponseModel<RentalDto>> {
    let newPath = this.apiUrl + "rentals/GetRentalDetails";
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }

  checkCarStatus(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiUrl + "rentals/checkcarstatus";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  add(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiUrl + "rentals/AddRental";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
