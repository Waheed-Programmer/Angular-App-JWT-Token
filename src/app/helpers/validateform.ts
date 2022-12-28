import { FormControl, FormGroup } from "@angular/forms";
// https://localhost:7279/api/User/
export default class ValidateForm{
  static validForm(formgroup:FormGroup){

    Object.keys(formgroup.controls).forEach(field=>{
      const control = formgroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validForm(control);
      }
    })

  }
}
