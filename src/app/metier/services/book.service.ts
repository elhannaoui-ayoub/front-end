import {Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../../dao/model/Book";
import {Category} from "../../dao/model/Category";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) {
  }

  public searchBooks(keyword="",page:number=1,size:number=4):Observable<any>{
    return  this.http.get(`http://localhost:8082/books?name_like=${keyword}&_page=${page}&_limit=${size}`);
  }


  public saveBook(book: Book,image:File):Observable<Book>{
    /*const formData = new FormData();
    formData.append('image',image);
    book.image="";
    console.log(book.image);
    formData.append('book', new Blob([JSON
      .stringify(book)], {
      type: 'application/json'
    }));*/

    /*for (const key in book) {
      if (book.hasOwnProperty(key)) {
        formData.append(key,book[key as keyof Book] as any);
      }
    };*/



    return this.http.post<Book>("http://localhost:8082/books/new", {});
  }


  public editBook(book: Book,image:File):Observable<Book>{
    /*const formData: FormData = new FormData();

    formData.append('image',image);
    book.image="";
    console.log(book.image);
    formData.append('book', new Blob([JSON
      .stringify(book)], {
      type: 'application/json'
    }));*/

      return this.http.post<Book>(`http://localhost:8082/books/${book.id}`, {});

  }


}
