import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';
import {Provider} from '../provider.model';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-delete-app',
  templateUrl: './delete-app.component.html',
  styleUrls: ['./delete-app.component.css']
})
export class DeleteAppComponent implements OnInit {
  provider = {     
    type: '',
    code: ''    
  }
  num:any;
  msg:any;
  providers: Provider[]=[];
  temp:string="false";
  requiredForm!: FormGroup;
  constructor(private providerService: ProviderService,private router:Router,private fb: FormBuilder) { 
    this.myForm();
  }

  myForm() {
    this.requiredForm = this.fb.group({
      code: ['', [Validators.required,
        Validators.pattern('(GE-|SG-|I5-|G8-|9W-|AI-)')]],
      type: ['', [Validators.required,
        Validators.pattern('(DOMESTIC|INTERNATIONAL)')]]
      
    });
 }
 isValidInput(name: string): boolean {
  
  return this.requiredForm.controls[name].invalid &&
    (this.requiredForm.controls[name].dirty || this.requiredForm.controls[name].touched);
}

  ngOnInit(): void {}
   

  removeProvider() { 
    const data = {            
      code: this.provider.code,
      type: this.provider.type      
    };
    this.num=0;
    this.temp="false";
    this.msg="";
    this.providerService.getProviders().subscribe(providers=>
      {
        this.providers = providers;
        providers.forEach(element => {
          if(element.code==data.code && element.type==data.type){
            this.num=element.id;
            this.temp="true";                     
            this.providerService.deleteProvider(this.num).subscribe(response => {console.log(response)});            
          }
        });        
     
      if(this.num!=0){
        this.router.navigate(['']);
      }
      else{
        console.log(this.num);
        this.msg="Entered Code & Type combination is not available in DB. Hence cannot be deleted! ";
        return this.msg;
      } });
      
      return "";     
    
    
  }
  
  

  


}
