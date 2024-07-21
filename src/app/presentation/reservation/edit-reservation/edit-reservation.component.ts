import {Component, OnInit} from '@angular/core';
import {Book} from "../../../dao/model/Book";
import {ReservationLine} from "../../../dao/model/ReservationLine";
import {Reservation} from "../../../dao/model/Reservation";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ReservationService} from "../../../metier/services/reservation.service";
import {Penalty} from "../../../dao/model/Penalty";
import {PenaltyService} from "../../../metier/services/penalty.service";
import {KeycloakService} from "keycloak-angular";


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit{
  books: Book[] = [];

  form=0;
  reserationLines: ReservationLine[]=[];
  penalties:Penalty[]=[];
  currentIndex!:number;
  reservation!:Reservation;
  editReservationFormGroup!: FormGroup;
  constructor(private router:Router,private rs:ReservationService,private fb:FormBuilder,private ps:PenaltyService,public keycloakService:KeycloakService) {
    this.reservation=this.router.getCurrentNavigation()?.extras.state as Reservation;
  }

  ngOnInit(): void {
    this.rs.searchReservationLines(this.reservation.id).subscribe(
      {
        next:(resp)=>{
          this.reserationLines=resp as ReservationLine[];
          console.log(this.reserationLines);
        }
      }
    );

    this.editReservationFormGroup=this.fb.group({
      reservationStatus: this.fb.control(this.reservation.reservationStatus, [Validators.required]),
      dateDebut: this.fb.control(this.reservation.dateDebut, [Validators.required]),
    });
  }
  handleSaveReservation(){
    console.log("hh");
    console.log(this.reserationLines);
    this.rs.saveEditReservation(this.editReservationFormGroup.value['reservationStatus'],this.editReservationFormGroup.value['dateDebut'],this.reservation.id,this.reserationLines).subscribe({
      next:()=>{
        location.reload();
     // this.router.navigateByUrl("/reservations/list");
      }
    })
   // alert(this.editReservationFormGroup.value['dateDebut']);
  }

  showForm(index:number){
    this.currentIndex=index;
    this.form=1;
    this.rs.searchReservationLinePenalties(this.reserationLines[index].id).subscribe(
      {
        next:(resp)=>{
          this.penalties=resp as Penalty[];
          console.log(this.penalties);
        }
      }
    );
  }

  showVals(){
    //this.form=0;
  }

  onInput2(event: Event): void {
    const input = event.target as HTMLInputElement;

  }
  dropPenalty(penalty:Penalty){
    this.ps.dropPenalty(penalty.id).subscribe({
      next:()=>{
        location.reload();
      }
    })
  }

  goToBook(book:Book){
    this.router.navigateByUrl("books/view",{state :book});
  }

  routerAffect(penalty: Penalty){
    this.router.navigateByUrl("penalties/edit", { state: penalty });
  }

}
