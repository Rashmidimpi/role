import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isSignedIn: boolean;
  dashboard:any;
  userrole:string;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
  ) {
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
    });
    this.userrole = this.token.getrole();

    if(this.token.getrole()==="admin"){
      this.dashboard="adminDashboard";
    }else if(this.token.getrole()==="user"){
      this.dashboard="userDashboard";
    }else if(this.token.getrole()==="staff"){
      this.dashboard="staffDashboard";
    }else if(this.token.getrole()==="others"){
      this.dashboard="othersDashboard";
    }
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

}
