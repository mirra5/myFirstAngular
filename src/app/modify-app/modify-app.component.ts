import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';
import {Provider} from '../provider.model';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-modify-app',
  templateUrl: './modify-app.component.html',
  styleUrls: ['./modify-app.component.css']
})
export class ModifyAppComponent implements OnInit {
  provider = {     
    type: '',
    code: '' ,
    name:'',
    id:0   
  }
  num:any;
  temp:any="false";
  tempfalse:any="false";
  datacheck:string="false";
  msgReturn:string="";
  msg:string="Entered code is not available in DB.";
  providers: Provider[]=[];
  
  requiredForm!: FormGroup;
  constructor(private providerService: ProviderService,private router:Router,private fb: FormBuilder) { 
    this.myForm();
  }

  myForm() {
    this.requiredForm = this.fb.group({
      code: ['', [Validators.required,
        Validators.pattern('(GE-|SG-|I5-|G8-|9W-|AI-)')]],
      updateOn: blur,
      type: ['', [Validators.required,
        Validators.pattern('(DOMESTIC|INTERNATIONAL)')]],
        
    });
 }
 isValidInput(name: string): boolean {
  
  return this.requiredForm.controls[name].invalid &&
    (this.requiredForm.controls[name].dirty || this.requiredForm.controls[name].touched);
  }

  isDataAvailable(code:string){   
    return (requiredForm: FormGroup): ValidationErrors | null => {
    this.temp="false";
    this.providers.forEach(ele=>{
      console.log("element code is "+ele.code+" "+this.provider.code);
      if(ele.code==this.requiredForm.controls[code].value){
        this.temp="true";
        console.log("temp is true");
      }
    });
    console.log("is data available "+this.temp);
    if(this.temp=="false"){
      return {isDataAvailable: "true"};
    }
    
    return null;
  }
}




  ngOnInit(): void {
    this.providerService.getProviders().subscribe(providers=>
      {
        this.providers = providers;
      });
  }

  UpdateProvider(){
    const data = {            
      code: this.provider.code,
      type: this.provider.type,
      name:this.provider.name,
      id:this.provider.id      
    };
    this.num=this.providers.length;
    this.datacheck="false";
    this.msgReturn="";

    for(let element of this.providers){
      if(element.code == data.code && element.type==data.type){
        console.log("first if "+element.code+" "+element.type);
        this.datacheck="true";
        break;
      }
      else if(element.code==data.code){
        console.log("second if "+element.code+" "+element.type);
        this.datacheck="available";
        data.name=element.name;
        data.id=element.id;
        
        this.num=element.id;
        
      }
      
    }
      
      
      if(this.datacheck=="available"){
        this.providerService.editProvider(data).subscribe(response => console.log(response));
        this.router.navigate(['']);
      }
      else if(this.datacheck=="true"){
        this.msgReturn="Entered code and type is already available in DB!!";       
        return this.msgReturn;
      }
      else{        
        this.msgReturn="Entered code is not available in DB!!";
        return this.msgReturn;
      }
   
      return "";
      
  }
}
