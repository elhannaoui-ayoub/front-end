/*import { Injectable } from '@angular/core';
import {Book} from "../../dao/model/Book";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private countSource = new BehaviorSubject<number>(this.getCartItems().length);
  currentCount = this.countSource.asObservable();

  incrementCount() {
    this.countSource.next(this.countSource.value + 1);
  }
  constructor() {
   this.countSource.next(this.getCartItems().length);
  }

  cartKey = 'cart';
  addToCart(book: Book): void {
    let cart: Book[] = this.getCartItems();
    const bookExists = cart.some(cartBook => cartBook.id === book.id);

    if (!bookExists) {
      cart.push(book);
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
     this.incrementCount();
    } else {
      console.log('Book already in cart');
    }
  }

  getCartItems(): Book[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }


}
*/

import { Injectable } from '@angular/core';
import { Book } from "../../dao/model/Book";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  private countSource = new BehaviorSubject<number>(this.getCartItems().length);
  currentCount = this.countSource.asObservable();

  private cartItemsSource = new BehaviorSubject<Book[]>(this.getCartItems());
  currentCartItems = this.cartItemsSource.asObservable();

  constructor() {
    this.updateCount();
    this.updateCartItems();
  }

  private updateCount() {
    this.countSource.next(this.getCartItems().length);
  }

  private updateCartItems() {
    this.cartItemsSource.next(this.getCartItems());
  }

  incrementCount() {
    this.countSource.next(this.countSource.value + 1);
  }

  addToCart(book: Book): void {
    let cart: Book[] = this.getCartItems();
    const bookExists = cart.some(cartBook => cartBook.id === book.id);

    if (!bookExists) {
      cart.push(book);
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
      this.updateCount();
      this.updateCartItems();
    } else {
      console.log('Book already in cart');
    }
  }

  getCartItems(): Book[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  getCartItemsObservable(): Observable<Book[]> {
    return this.currentCartItems;
  }

  removeBookFromCart(book:Book){
    let cart: Book[] = this.getCartItems();
    cart = cart.filter(cartBook => cartBook.id !== book.id);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartItemsSource.next(cart);

    this.countSource.next(this.getCartItems().length);// Notify listeners
  }
  removeAllBooksFromCart(){
    let cart: Book[] = this.getCartItems();
    cart = cart.filter(cartBook => false);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartItemsSource.next(cart);

    this.countSource.next(this.getCartItems().length);// Notify listeners
  }
}
