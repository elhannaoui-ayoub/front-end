import { Component } from '@angular/core';
import {Book} from "../../../dao/model/Book";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent {
  book!:Book;

  constructor( private router:Router    ,protected keycloakService:KeycloakService) {

    this.book=this.router.getCurrentNavigation()?.extras.state as Book;

    console.log(this.book);
  }
  routerAffect(){
    this.router.navigateByUrl("books/edit",{state :this.book});
  }
}
