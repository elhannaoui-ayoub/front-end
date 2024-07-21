import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../dao/model/Category";
import {Publisher} from "../../dao/model/Publisher";

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http:HttpClient) {
  }

  public searchPublishers(keyword="",page:number=1,size:number=4):Observable<any>{
    return  this.http.get(`http://localhost:8082/publishers/list?name_like=${keyword}&_page=${page}&_limit=${size}`);
  }
  public savePublisher(publisher: Publisher):Observable<Publisher>{
    return this.http.post<Publisher>("http://localhost:8082/publishers/new",publisher);
  }

  public editPublisher(publisher: Publisher):Observable<Publisher>{
    return this.http.post<Publisher>("http://localhost:8082/publishers/edit",publisher);
  }
}
