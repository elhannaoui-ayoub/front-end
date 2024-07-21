import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Publisher} from "../../../dao/model/Publisher";
import {Reservation} from "../../../dao/model/Reservation";
import {Book} from "../../../dao/model/Book";
import {FormGroup} from "@angular/forms";
import {ReservationService} from "../../../metier/services/reservation.service";
import {ReservationLine} from "../../../dao/model/ReservationLine";

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit{

  books: Book[] = [];
  reserationLines: ReservationLine[]=[];
  reservation!:Reservation;
  editReservationFormGroup!: FormGroup;
  constructor(private router:Router,private rs:ReservationService) {
    this.reservation=this.router.getCurrentNavigation()?.extras.state as Reservation;
  }

  ngOnInit(): void {
    this.rs.searchReservationLines(this.reservation.id).subscribe(
      {
        next:(resp)=>{
          this.reserationLines=resp as ReservationLine[];
        }
      }
    )
  }
  goToBook(book:Book){
    this.router.navigateByUrl("books/view",{state :book});
  }
  routerAffect(){
    this.router.navigateByUrl("reservations/edit",{state :this.reservation});
  }
}
