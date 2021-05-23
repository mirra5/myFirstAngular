import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError,retry } from 'rxjs/operators';
import {Provider} from './provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private apiurl = 'api/providers/';
  
  constructor(private http: HttpClient) { 
    console.log("hi")
  }

  
  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.apiurl).pipe(      
      retry(2),      
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createProvider(provider: Provider): Observable<Provider> {
    
    
    return this.http.post<Provider>(this.apiurl, provider).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editProvider(provider: Provider): Observable<any> {
    return this.http.put(this.apiurl + provider.id, provider);
  }

  deleteProvider(id: number): Observable<any> {
    return this.http.delete(this.apiurl + id);
  }

  

  
 
}
