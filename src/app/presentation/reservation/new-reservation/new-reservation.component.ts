import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Publisher} from "../../../dao/model/Publisher";
import {Book} from "../../../dao/model/Book";
import {CartService} from "../../../metier/services/cart.service";
import {ReservationService} from "../../../metier/services/reservation.service";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {ClientService} from "../../../metier/services/client.service";

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit{
  newReservationFormGroup!: FormGroup;
  publishers: Publisher[] = [];

  clients:any[]=[];
  handleSaveReservation() {
    if(this.newReservationFormGroup.value['client']==null){
      this.newReservationFormGroup.value['client']=this.keycloakService.getKeycloakInstance().subject;
    }
    this.rs.saveNewReservation(this.newReservationFormGroup.value['pickupDate'],this.books,this.newReservationFormGroup.value['client']).subscribe({
      next:()=>{
        this.cartService.removeAllBooksFromCart();
      this.router.navigateByUrl("/reservations/list");
      }
    })
  }

  books: Book[] = [];

  ngOnInit(): void {
    this.newReservationFormGroup=this.fb.group({
      pickupDate: this.fb.control(null, [Validators.required]),
      client:this.fb.control(null),
    });
  }

  constructor(private cs:ClientService, public keycloakService:KeycloakService, private cartService: CartService,private fb:FormBuilder,private rs:ReservationService,private router:Router) {
    this.cartService.getCartItemsObservable().subscribe(books => {

      this.books = books;
      if(books.length==0){
        this.router.navigateByUrl("/books/list")
      }
    });

    this.cs.searchClients().subscribe({
      next: (resp) => {
        this.clients = (resp as any[]).filter(client => client.id !== 'a320a85e-be0d-4d84-abb0-a9d930c7aeea');



      },
      error: err => {
        console.log(err);
      }
    });

  }

  removeBookFromCart(book:Book){
    this.cartService.removeBookFromCart(book);
  }

}
