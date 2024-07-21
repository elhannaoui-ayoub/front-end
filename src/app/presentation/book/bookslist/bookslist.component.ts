import { Component, OnInit } from '@angular/core';
import { BookService } from "../../../metier/services/book.service";
import { Book } from "../../../dao/model/Book";
import { Router } from "@angular/router";
import { Category } from "../../../dao/model/Category";
import { CategoryService } from "../../../metier/services/category.service";
import {Author} from "../../../dao/model/Author";
import {CartService} from "../../../metier/services/cart.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-bookslist',
  templateUrl: './bookslist.component.html',
  styleUrls: ['./bookslist.component.css']
})
export class BookslistComponent implements OnInit {
  books: Book[] = [];
  booksFiltered: Book[] = [];
  categories: Category[] = [];

  currentKeyword: string = '';
  currentCategory: number | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 5;

  totalPages: number = 0;
  paginationElements: number[] = [];

  constructor(private cs: CategoryService, private bs: BookService, private router: Router,private cartService: CartService,public keycloakService:KeycloakService) { }

  ngOnInit(): void {
    this.searchBooks();
  }

  searchBooks() {
    this.cs.searchCategories("gr", 1, 3).subscribe(
      {
        next: (resp) => {
          this.categories = resp as Category[];
          console.log("Categories loaded:", this.categories);
        },
        error: err => {
          console.log(err);
        }
      }
    );
    this.bs.searchBooks("gr", 1, 3).subscribe(
      {
        next: (resp) => {
          this.books = resp as Book[];
          this.filterBooks(); // Filter books immediately after loading
          console.log("Books loaded:", this.books);
        },
        error: err => {
          console.log(err);
        }
      }
    );
  }

  search(keyword: string) {
    this.currentKeyword = keyword;
    this.currentPage = 1; // Reset to first page
    this.filterBooks();
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search(input.value);
  }

  onInput2(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = parseInt(selectElement.value, 10);
    this.currentCategory = isNaN(selectedValue) ? null : selectedValue;
    this.currentPage = 1; // Reset to first page
    this.filterBooks();
  }

  filterBooks() {

    const filteredBooks = this.books.filter((com) => {
      const matchesKeyword = !this.currentKeyword ||
        (com.intitule && com.intitule.toLowerCase().includes(this.currentKeyword.toLowerCase())) ||
        (com.description && com.description.toLowerCase().includes(this.currentKeyword.toLowerCase())) ||
        (com.isbn && com.isbn.toLowerCase().includes(this.currentKeyword.toLowerCase()));

      const matchesCategory = this.currentCategory === null ||
        com.categories.some((e: Category) => e.id === this.currentCategory);
      if(this.keycloakService.getUserRoles().includes('ADMIN')){


        return matchesKeyword && matchesCategory;
      }
      const matchStatus = com.status=="ACTIVE";

      return matchesKeyword && matchesCategory && matchStatus;
    });

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.booksFiltered = filteredBooks.slice(start, end);
    this.updatePagination(filteredBooks.length); // Pass filteredBooks length
  }

  updatePagination(totalItems: number) {
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.paginationElements = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.filterBooks();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterBooks();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterBooks();
    }
  }

  routerAffect(book : Book){
    this.router.navigateByUrl("books/edit",{state :book});
  }

  routerAffect2(book : Book){
    this.router.navigateByUrl("books/view",{state :book});
  }

  addToCart(book: Book): void {
    this.cartService.addToCart(book);
  }


}
