import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../dao/model/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {

  }

  public searchCategories(keyword="",page:number=1,size:number=4):Observable<any>{
    return  this.http.get(`http://localhost:8082/categories/list?name_like=${keyword}&_page=${page}&_limit=${size}`);
  }
  public saveCategory(category: Category):Observable<Category>{
    return this.http.post<Category>("http://localhost:8082/categories/new",category);
  }
  public editCategory(category: Category):Observable<Category>{
    return this.http.post<Category>("http://localhost:8082/categories/edit",category);
  }

}
