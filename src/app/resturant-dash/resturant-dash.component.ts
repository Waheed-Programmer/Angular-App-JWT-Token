import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../shared/api.service';
import { ResturantData } from './resturant.model';

@Component({
  selector: 'app-resturant-dash',
  templateUrl: './resturant-dash.component.html',
  styleUrls: ['./resturant-dash.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ResturantDashComponent implements OnInit {
  formValue!:FormGroup;
  resturantModelObj :ResturantData=new ResturantData;
  allResturnatData: any;
  showAdd!:boolean;
  showbtn!:boolean;
  showRes!:boolean;
  show!:boolean;
  header:string='';
  body:string='';
  constructor(config: NgbModalConfig, private modalService: NgbModal,private formBuilder:FormBuilder, private api:ApiService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content:any) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    })
    this.getallData()
  }
  Reset(){
    this.formValue.reset();
  }
  addResto(){
    this.resturantModelObj.name=this.formValue.value.name;
    this.resturantModelObj.email=this.formValue.value.email;
    this.resturantModelObj.mobile=this.formValue.value.mobile;
    this.resturantModelObj.address=this.formValue.value.address;
    this.resturantModelObj.services=this.formValue.value.services;
    this.api.postResturant(this.resturantModelObj).subscribe(res=>{
      console.log(res);
      this.show=true;
      this.header="Record Saved";
      this.body="Your record saved secussfully!"
      this.formValue.reset();
      this.getallData();
    },
    err=>{alert("error")}
    )
  }
  
  getallData(){
    this.api.getResturant().subscribe(res=>{
      this.allResturnatData=res;
      })
  }

  deleteData(data:any){
    this.api.deleteResturant(data.id).subscribe(res=>{
      this.show=true;
      this.header="Record Deleted";
      this.body="Your record deleted secussfully!"
      this.getallData();
    })
  }
  onEditResto(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.showRes=false;
    this.resturantModelObj.id=data.id;
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['mobile'].setValue(data.mobile)
    this.formValue.controls['address'].setValue(data.address)
    this.formValue.controls['services'].setValue(data.services)

  }

  updateResto(){
    this.resturantModelObj.name=this.formValue.value.name;
    this.resturantModelObj.email=this.formValue.value.email;
    this.resturantModelObj.mobile=this.formValue.value.mobile;
    this.resturantModelObj.address=this.formValue.value.address;
    this.resturantModelObj.services=this.formValue.value.services;
    this.api.updateResturant(this.resturantModelObj,this.resturantModelObj.id).subscribe(res=>{
      this.show=true;
      this.header="Record updated";
      this.body="Your record updated secussfully!"
      this.formValue.reset();
      this.getallData();
    })
  }
  ClickAddResTo(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
    this.showRes=true;
  }
  close() {
    this.show = false;
    setTimeout(() => this.show = false, 3000);
  }
}
