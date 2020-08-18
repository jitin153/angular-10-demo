import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceResponse } from 'src/app/models/service-response.model';
import { UserDetail } from 'src/app/models/user-detail.model';
import { BASE_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }

  getUserdetails(email:string){
    return this.http.post<ServiceResponse<UserDetail>>(`${BASE_URL}/auth/userdetails`,{email}); 
  }

  logout(){
    return this.http.get<ServiceResponse<string>>(`${BASE_URL}/auth/logout`); 
  }
}
