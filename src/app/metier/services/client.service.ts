import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  public searchClients():Observable<any>{
    return  this.http.get(`http://localhost:8090/admin/realms/bookwise/users`);
  }
}
