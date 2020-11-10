import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { AuthService } from './auth.service';
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(public auth: AuthService, public router: Router, private authtoken: TokenService, private authstate: AuthStateService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    console.log("In role guard")
    const expectedRole = route.data.expectedRole;
    const role = localStorage.getItem('user_role');
    // decode the token to get its payload
    if (!this.authtoken.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    } else if (this.authtoken.isLoggedIn() && role !== expectedRole) {
      // this.router.navigate(['notauthorized']);
      this.authstate.setAuthState(false);
      this.authtoken.removeToken();
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
