import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  brandsApiUrl="https://localhost:44350/api/brands/";

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>>{
    let newBrandApiUrl= this.brandsApiUrl+"getallbrand";
    return this.httpClient
    .get<ListResponseModel<Brand>>(newBrandApiUrl);
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.brandsApiUrl + "addbrand", brand)
  }
}
