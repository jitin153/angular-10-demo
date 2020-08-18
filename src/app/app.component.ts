import { Component } from '@angular/core';
import { JwtAuthenticationService } from './services/jwt-authentication.service';
import { MenuItem } from 'primeng/api';
import { UserDetail } from './models/user-detail.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public jwtAuthenticationService: JwtAuthenticationService){}

  userActions: MenuItem[];
  user:UserDetail;
  displayName:string;
  ngOnInit() {
    this.jwtAuthenticationService.getLoggedInUserName().subscribe(user=>{
      this.user=user;
      this.displayName=this.user.fullName;
      let role = this.user.roles[0];
      role=role.substring(5,role.length);
      this.displayName=this.displayName+" ["+role+"]";
    })
    // if(this.jwtAuthenticationService.isLoggedIn()){
    //   this.username = this.jwtAuthenticationService.user.fullName;
    // }
    this.userActions = [
        // {label: 'Update', icon: 'pi pi-refresh', command: () => {
        //     this.update();
        // }},
        // {label: 'Delete', icon: 'pi pi-times', command: () => {
        //     this.delete();
        // }},
        // {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
        // {separator:true},
        // {label: 'Logout', icon: 'pi pi-sign-out', routerLink: ['/setup']}

        {label: 'Edit Profile', icon: 'pi pi-user-edit'},
        {label: 'Change Password', icon: 'pi pi-key'},
        {separator:true},
        {label: 'Logout', icon: 'pi pi-sign-out', command: () => {this.jwtAuthenticationService.logout()}}
    ];
}
}
