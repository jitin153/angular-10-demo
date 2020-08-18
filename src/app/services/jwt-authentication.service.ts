import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, TOKEN, AUTH_USER_ID } from '../app.constants';
//import { map } from 'rxjs/operators';
import { UserDetail } from '../models/user-detail.model';
import { Router } from '@angular/router';
import { ServiceResponse } from '../models/service-response.model';
import { UserDataService } from './data/user-data.service';

//export const TOKEN = 'token'
//export const AUTHENTICATED_USER = 'authenticaterUser'

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {
  @Output() userOnLogin:EventEmitter<UserDetail>=new EventEmitter<UserDetail>();
  //errorMessage:string;
  //response:ServiceResponse<String>;
  user:UserDetail;
  constructor(private http: HttpClient, private router: Router,private userDataService:UserDataService) { }

  executeJWTAuthenticationService(username, password) {    
    return this.http.post<ServiceResponse<string>>(
      `${BASE_URL}/authenticate`,{
        username,
        password
      });
      
      // .pipe(
      //   map(
      //     data => {
      //       sessionStorage.setItem(AUTHENTICATED_USER, username);
      //       sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
      //       return data;
      //     }
      //   )
      // );
  }

  // getAuthenticatedUser() {
  //   return sessionStorage.getItem(AUTHENTICATED_USER);
  // }

  getAuthenticatedToken() {
      return sessionStorage.getItem(TOKEN);
  }

  isLoggedIn() {
    let token = sessionStorage.getItem(TOKEN);
    return !(token === null);
  }

  logout(){
    //sessionStorage.removeItem(AUTHENTICATED_USER);
    this.userDataService.logout().subscribe(response=>{
      if(response.result=='SUCCESS'){
        this.user=null;
        sessionStorage.removeItem(TOKEN);
        sessionStorage.removeItem(AUTH_USER_ID);
        this.router.navigate(['login']);
      }
    })
  }

  getLoggedInUserDetail(email):UserDetail{
    this.userDataService.getUserdetails(email).subscribe(response=>{
      if(!response.isError){
        this.user=response.result;
        sessionStorage.setItem(AUTH_USER_ID, this.user.userId+"");
        this.userOnLogin.emit(this.user);
      }
      // else{
      //  this.invalidLogin = true;
      //  this.errorMessage=response.errors[0].errorMessage;
      // }
    });
    return this.user;
    // return {
    //   userId:1,
    //   fullName:'Jitin Gangwar',
    //   email: 'jitingangwar@gmail.com',
    // mobile: '8954984598',
    // password: null,
    // dateOfBirth: null,
    // dateOfJoining: null,
    // status: 'ACTIVE',
    // isBlocked: false,
    // roles: null
    // }
  }
  getLoggedInUserName(){
    return this.userOnLogin;
  }
}
