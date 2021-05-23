import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';
import {Provider} from '../provider.model';

@Component({
  selector: 'app-view-app',
  templateUrl: './view-app.component.html',
  styleUrls: ['./view-app.component.css']
})
export class ViewAppComponent implements OnInit {
  
  searchText:any;
  providers: Provider[] = [];
  constructor(private providerService: ProviderService) { }

  ngOnInit():void {
    this.getProviders();
  }



  private getProviders(){
    this.providerService.getProviders().subscribe(providers=>this.providers = providers);
    }
  


  }


