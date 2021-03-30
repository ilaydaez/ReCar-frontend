import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  carToBeRented:Rental;
  amountPaye:number = 0;

  apiUrl = "https://localhost:44350/api/"

  constructor(private httpClient: HttpClient ) { }

  getall():Observable<ListResponseModel<Payment>> {
    let newPath = this.apiUrl + "payments/getall";
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }

  add(payment:Payment):Observable<ResponseModel> {
    let newPath = this.apiUrl + "payments/add";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  getRental(){
    return this.carToBeRented;
  }
  
  getRentalAmountPaye(){
    return this.amountPaye;
  }

  setRental(rental:Rental, amountOfPayment:number){
    this.carToBeRented=rental;
    this.amountPaye=amountOfPayment;
  }

}
