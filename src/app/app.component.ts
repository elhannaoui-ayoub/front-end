import { Component } from '@angular/core';
import {CartService} from "./metier/services/cart.service";
import {Book} from "./dao/model/Book";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  books:Book[]=[];
  count: number=0;

  constructor(private cartService:CartService,protected keycloakService:KeycloakService) {
    this.cartService.currentCount.subscribe(count => {this.count = count; });
    this.cartService.getCartItemsObservable().subscribe(books => {
      this.books = books;
    });
  }

  handleLogout(){
    this.keycloakService.logout(window.location.origin);
  }


}
