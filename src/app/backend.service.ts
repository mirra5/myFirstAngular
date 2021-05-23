import {InMemoryDbService} from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BackendService implements InMemoryDbService{
  constructor() { }
  
  createDb(){
    return {
      providers: [
      {
        id: 1,
        name:  'INDIGO', 
        code: 'GE-', 
        type: 'Domestic' 
      },
      {
        id: 2,
        name:  'SPICEJET', 
        code: 'SG-', 
        type: 'International' 
      },
      {
        id: 3,
        name:  'AIRASIA', 
        code: 'I5-', 
        type: 'Domestic'  
      },
      {
        id: 4,
        name:  'GOAIR', 
        code: 'G8-', 
        type: 'International' 
      },
      {
        id: 5,
        name:  'JETAIRWAYS', 
        code: '9W-', 
        type: 'Domestic' 
      },
      {
        id: 6,
        name:  'AIRINDIA', 
        code: 'AI-', 
        type: 'International' 
      }
        
      ]
    };
  }
}
