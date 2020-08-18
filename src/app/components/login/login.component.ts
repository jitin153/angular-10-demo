import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from '../../services/jwt-authentication.service';
import { UserDataService } from '../../services/data/user-data.service';
import { UserDetail } from 'src/app/models/user-detail.model';
import { TOKEN } from 'src/app/app.constants';
import { ServiceResponse } from 'src/app/models/service-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'jitingangwar@gmail.com';
  password = 'Jitin#153';
  errorMessage : string;
  invalidLogin = false;
  user:UserDetail;
  constructor(private router: Router, private jwtAuthenticationService: JwtAuthenticationService,private userDataService:UserDataService) { }
  ngOnInit() {
  }

  handleJWTAuthLogin() {
    this.jwtAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          res => {
            if(res.isError){
              this.invalidLogin = true;
              this.errorMessage=res.errors[0].errorMessage;
            }else{
              sessionStorage.setItem(TOKEN, `Bearer ${res.result}`);
             // this.invalidLogin = false ;
             this.user=this.jwtAuthenticationService.getLoggedInUserDetail(this.username);
             console.log('USER: '+this.user)
             if(this.user !==null){
              this.router.navigate(['dashboard'])
             }else{
              this.errorMessage ='Oops..something went wrong!';
             }
            }    
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        );
        // .subscribe(res=>{
        //   if(res.isError){
        //     this.errorMessage=res.errors[0].errorMessage;
        //   }else{
        //     sessionStorage.setItem(TOKEN, `Bearer ${res.result}`);
        //   }
        // });
  }
}
