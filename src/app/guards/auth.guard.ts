import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService , private rout: Router, private toast: NgToastService){}
  canActivate(){
    if(this.auth.isLoggedIn()){
      return true;
    }
    else{
      this.toast.error({detail:"ERROR", summary:"Please Login First"});
      this.rout.navigate(['login']);
      return false;
    }
  }

}
