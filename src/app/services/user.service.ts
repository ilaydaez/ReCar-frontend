import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44350/api/users/';

  constructor(private httpClient: HttpClient) {}

  getUserByMail(email: string) {
    return this.httpClient.get<ListResponseModel<User>>(
      this.apiUrl + 'GetByUserEmail?email=' + email
    );
  }
  getUserByUserId(id: number): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(
      this.apiUrl + 'GetByUserId?id=' + id
    );
  }

  update(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'UpdateUser',
      user
    );
  }

}
