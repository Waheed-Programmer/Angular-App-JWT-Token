import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private service:AuthService, private rout:Router , private toast: NgToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.service.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            // this.toast.warning({detail:"WARNING", summary:"Token is Expired,Please Login Again"});
            // this.rout.navigate(['login'])
            debugger
            return this.handleUnauthorizeError(request,next);
          }
        }
        return throwError(()=> new Error("Something other error occured"));
      })
    );
  }

  handleUnauthorizeError(req: HttpRequest<any>, next: HttpHandler){debugger
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.service.getToken()!;
    tokenApiModel.refreshToken = this.service.getRefreshToken()!;
    return this.service.renewToken(tokenApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.service.storeRefreshToken(data.refreshToken);
        this.service.storeToken(data.accessToken);
        req = req.clone({
          setHeaders : {Authorization:`Bearer ${data.accessToken}`}
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning({detail:"WARNING", summary:"Token is Expired,Please Login Again"});
          this.rout.navigate(['login'])
        })
      })
    )
  }
}
