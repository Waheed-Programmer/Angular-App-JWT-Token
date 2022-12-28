import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { TokenApiModel } from '../models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "https://localhost:7279/api/User/"

  private userPayLoad:any;
  constructor(private http: HttpClient, private rout: Router, private toast:NgToastService) {
    this.userPayLoad = this.decodeToken();
   }


  getUser(){
    return this.http.get<any>(this.baseUrl)
  }
  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }

  storeToken(tokenvalue:string){
    localStorage.setItem('token', tokenvalue);
  }

  storeRefreshToken(tokenvalue:string){
    localStorage.setItem('refreshToken', tokenvalue);
  }

  signOut(){
    localStorage.clear();
    this.toast.warning({detail:"LOGOUT", summary:"Account is Logout!"});
    this.rout.navigate(['login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }
  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayLoad)
    return this.userPayLoad.name;
  }


  getroleFromToken(){
    if(this.userPayLoad)
    return this.userPayLoad.role;
  }

  renewToken(tokenApi:TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`,tokenApi);
  }
}
