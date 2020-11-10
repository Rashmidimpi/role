import { Injectable } from '@angular/core';
import { TokenService } from "./token.service";
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authtoken: TokenService, public router: Router) { }

  canActivate(): boolean {
    if (this.authtoken.isLoggedIn()) {
      if (this.authtoken.getrole() === "admin") {
        this.router.navigate(['adminDashboard']);
        
      } else if (this.authtoken.getrole() === "user") {
        this.router.navigate(['userDashboard']);
        this.router.navigate(['userlist']);
      } else if (this.authtoken.getrole() === "staff") {
        this.router.navigate(['staffDashboard']);
        this.router.navigate(['profile']);
      }
      else if (this.authtoken.getrole() === "others") {
        this.router.navigate(['othersDashboard']);
        
      }
      return false;
    }
    return true;
  }

}
