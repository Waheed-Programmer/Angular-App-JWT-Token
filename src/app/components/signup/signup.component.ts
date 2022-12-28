import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  type: string="password";
  isText:boolean=  false;
  eyeIcone: string = "fa-eye-slash";
  signUpForm!: FormGroup

  constructor(
    private fb:FormBuilder,
     private service: AuthService,
      private router: Router,
      private toast: NgToastService
      ) { }



  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      username: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcone = "fa-eye" : this.eyeIcone = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }


  onSign(){
    if(this.signUpForm.valid){
      this.service.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          // alert(res.message);
          this.signUpForm.reset();
          this.toast.success({detail:"SUCCESS",summary:res.message, duration:5000});
          this.router.navigate(['login']);
        }),
        error:(err=>{
          // alert(err?.error.message);
          this.toast.error({detail:"ERROR",summary:err?.error.message, duration:5000});
        })
      })



    }else{

      console.log("error");
      // this.validForm(this.loginForm);
      ValidateForm.validForm(this.signUpForm);



    }
  }

}
