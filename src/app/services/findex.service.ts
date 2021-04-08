import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Findex } from '../models/findex';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FindexService {

  apiUrl="https://localhost:44350/api/"
  constructor( private httpClient:HttpClient) { }
  
  add(findex:Findex):Observable<ResponseModel>{
    let newPath=this.apiUrl+"findex/add"
    return this.httpClient.post<ResponseModel>(newPath,findex)
   }

   delete(findex:Findex):Observable<ResponseModel>{
    let newPath=this.apiUrl+"findex/delete"
    return this.httpClient.post<ResponseModel>(newPath,findex)
   }

   update(findex:Findex):Observable<ResponseModel>{
    let newPath=this.apiUrl+"findex/update"
    return this.httpClient.post<ResponseModel>(newPath,findex)
   }

   getFindexScoreByUserId(id:number):Observable<ListResponseModel<Findex>>{
    let newPath=this.apiUrl+"findex/getbyuserid?id="+id
    return this.httpClient.get<ListResponseModel<Findex>>(newPath);

  }
}
