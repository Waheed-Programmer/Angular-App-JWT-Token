import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private fullName$ =new BehaviorSubject<string>("");
private role$ =new BehaviorSubject<string>("");
constructor() { }

public getRoleFromstore(){
  return this.role$.asObservable();
}

public setRoleForStore(role: string){
  this.role$.next(role)
}


public getfullNameFromstore(){
  return this.fullName$.asObservable()
}


public setfullNameForStore(fullname: string){
  this.fullName$.next(fullname)
}


}
