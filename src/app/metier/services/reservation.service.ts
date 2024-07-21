import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../../dao/model/Reservation";
import {ReservationLine} from "../../dao/model/ReservationLine";
import {Book} from "../../dao/model/Book";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http:HttpClient) {

  }

  public searchReservations(keyword="",page:number=1,size:number=4):Observable<any>{
    return  this.http.get(`http://localhost:8083/reservations/list?name_like=${keyword}&_page=${page}&_limit=${size}`);
  }
  public searchReservationLines(id:number):Observable<any>{
    return  this.http.get(`http://localhost:8083/reservationlines/list/${id}`);
  }

  public searchReservationLinePenalties(id:number):Observable<any>{
    return  this.http.get(`http://localhost:8083/penalties/list/${id}`);
  }
  public saveEditReservation(reservationStatus:String,dateDebut:String,id:number,reserationLines:ReservationLine[]){
    /*const data= new FormData();
    data.append('reservationStatus',reservationStatus);
    data.append('dateDebut',dateDebut);*/

    return  this.http.post(`http://localhost:8083/reservations/edit`,{
      'reservationStatus':reservationStatus,
      'dateDebut':dateDebut,
      'id':id,
      'reservationLines':reserationLines
    }
    );

  }

  public saveNewReservation(dateDebut:String,books:Book[],id:String){
    /*const data= new FormData();
    data.append('reservationStatus',reservationStatus);
    data.append('dateDebut',dateDebut);*/

    return  this.http.post(`http://localhost:8083/reservations/new`,{

        'dateDebut':dateDebut,
         'user_id':id,
        'books':books
      }
    );

  }


}
