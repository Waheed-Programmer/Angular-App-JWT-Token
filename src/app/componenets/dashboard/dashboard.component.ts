import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users:any = [];
  public fullName: string = "";
  public role!: string;
  constructor(private service: AuthService , private userStore:UserStoreService) { }

  ngOnInit(): void {


    this.userStore.getfullNameFromstore().subscribe(val=>{
      const fullNamefromToken = this.service.getFullNameFromToken();
      this.fullName = val || fullNamefromToken
    })

    this.userStore.getRoleFromstore().subscribe(val=>{
      const rolefromToken = this.service.getroleFromToken();
      this.role = val || rolefromToken
    })
    this.service.getUser().subscribe(res=>{
      this.users = res;
    });

  }

  logout(){
    this.service.signOut();
  }

}
