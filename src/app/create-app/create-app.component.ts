import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';
import {Provider} from '../provider.model';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.css']
})
export class CreateAppComponent implements OnInit {
  provider = {
    name: '',    
    type: '',
    code: '',
    id: null
  }
  value:string='';
  num:any;
  providers: Provider[]=[];
  msg:string='';
  
  requiredForm!: FormGroup;
  temp: string="false";
  constructor(private providerService: ProviderService,private router:Router,private fb: FormBuilder) { 
    this.myForm();
  }

  myForm() {
    this.requiredForm = this.fb.group({
      name: ['', [Validators.required,
        Validators.pattern('(INDIGO|SPICEJET|AIRASIA|GOAIR|JETAIRWAYS|AIRINDIA)')]],
      type: ['', [Validators.required,
        Validators.pattern('(Domestic|International)')]]
      
    });
 }
 isValidInput(name: string): boolean {
  
  return this.requiredForm.controls[name].invalid &&
    (this.requiredForm.controls[name].dirty || this.requiredForm.controls[name].touched);
}
 valueAutoComplete(){
  if(this.provider.name=='INDIGO')
  {
     this.provider.code = 'GE-';
  }
  if(this.provider.name=='SPICEJET')
  {
    this.provider.code = 'SG-';
  }
  if(this.provider.name=='AIRASIA')
  {
    this.provider.code = 'I5-';
  }
  if(this.provider.name=='GOAIR')
  {
    this.provider.code = 'G8-';
  }
  if(this.provider.name=='JETAIRWAYS')
  {
    this.provider.code = '9W-';
  }
  if(this.provider.name=='AIRINDIA')
  {
    this.provider.code = 'AI-';
  }
  
  
  return true;
 }

  ngOnInit(): void {
    this.num=this.getProvidersLen();
    this.valueAutoComplete();
  }
  

  addProvider() {
    
    
    const data = {
      name: this.provider.name,      
      code: this.provider.code,
      type: this.provider.type,
      id: this.num+1
    };
    this.temp="false";
    this.providers.forEach(ele=>{      
      if(ele.name == data.name && ele.type==data.type){
        this.temp="true";
        console.log("temp is true");
        
      }
    });

    if(this.temp == "false"){
    this.providerService.createProvider(data).subscribe(response => {
      console.log(response)      
    });    
    this.router.navigate(['']);
    }
    else{
      this.msg="Entered Airline is already available in DB. Hence cannot be created again! ";
      return this.msg;
    }
    return "";
  }

  public getProvidersLen(){
    this.providerService.getProviders().subscribe(providers=>
      {
        this.providers = providers;
        
      });
      this.providers.forEach(ele=>{
        this.num=ele.id;
      })
      return this.num;
    }
    
  
  

}
