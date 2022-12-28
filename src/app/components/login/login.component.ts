import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string="password";
  isText:boolean=  false;
  eyeIcone: string = "fa-eye-slash";
  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
     private service: AuthService,
      private route:Router,
      private toast: NgToastService,
      private userStore: UserStoreService
      ) { }


  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['', Validators.required]
    })

  }

  hideShowPass(){
    debugger
    this.isText = !this.isText;
    this.isText ? this.eyeIcone = "fa-eye" : this.eyeIcone = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onLogin(){
    if(this.loginForm.valid){

      this.service.login(this.loginForm.value)
      .subscribe({
        next:(res=>{
          this.loginForm.reset();
          // alert(res.message);
          this.service.storeToken(res.accessToken);
          this.service.storeRefreshToken(res.refreshToken);
          const tokenPayLoad = this.service.decodeToken();
          this.userStore.setfullNameForStore(tokenPayLoad.name);
          this.userStore.setRoleForStore(tokenPayLoad.rule);
          this.toast.success({detail:"SUCCESS",summary:"Login Success!", duration:5000});
          this.route.navigate(['dashboard']);
        }),
        error:(err=>{
          // alert(err?.error.message)
          this.toast.error({detail:"ERROR",summary:err?.error.message, duration:5000});

        })
      });



    }else{

      console.log("error");
      ValidateForm.validForm(this.loginForm);


    }
  }


}
