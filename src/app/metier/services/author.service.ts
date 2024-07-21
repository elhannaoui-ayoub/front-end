import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Publisher} from "../../dao/model/Publisher";
import {Author} from "../../dao/model/Author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) {
  }

  public searchAuthors(keyword="",page:number=1,size:number=4):Observable<any>{
    return  this.http.get(`http://localhost:8082/authors/list?name_like=${keyword}&_page=${page}&_limit=${size}`);
  }

  public saveAuthor(author: Author):Observable<Author>{

    return this.http.post<Author>("http://localhost:8082/authors/new",author);
  }

  public editAuthor(author: Author):Observable<Author>{
    console.log(author);
    return this.http.post<Author>("http://localhost:8082/authors/edit",author);
  }
}
