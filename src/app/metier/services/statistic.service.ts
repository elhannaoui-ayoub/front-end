import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http:HttpClient) { }

  public getStatistique():Observable<any>{
    return  this.http.get(`http://localhost:8083/statistique`);
  }
}
