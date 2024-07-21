import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ReservationLine} from "../../dao/model/ReservationLine";
import {Penalty} from "../../dao/model/Penalty";

@Injectable({
  providedIn: 'root'
})
export class PenaltyService {

  constructor(private http:HttpClient) {

  }

  public searchPenalties(keyword="",page:number=1,size:number=4):Observable<any>{
    return  this.http.get(`http://localhost:8083/penalties/list?name_like=${keyword}&_page=${page}&_limit=${size}`);
  }


  public dropPenalty(id:number){
    /*const data= new FormData();
    data.append('reservationStatus',reservationStatus);
    data.append('dateDebut',dateDebut);*/

    return  this.http.post(`http://localhost:8083/penalties/drop/${id}`,{
        'id':id,

      }
    );

  }

  public saveEditPenalty(penalty:Penalty){
    /*const data= new FormData();
    data.append('reservationStatus',reservationStatus);
    data.append('dateDebut',dateDebut);*/

    return  this.http.post(`http://localhost:8083/penalties/edit`,penalty
    );

  }
}
