import { Component, OnInit } from '@angular/core';
import { Author } from "../../../dao/model/Author";
import { AuthorService } from "../../../metier/services/author.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-authorslist',
  templateUrl: './authorslist.component.html',
  styleUrls: ['./authorslist.component.css']
})
export class AuthorslistComponent implements OnInit {
  public authors: Author[] = [];
  authorsFiltered: Author[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3; // Change this to the desired items per page
  totalPages: number = 1;
  searchKeyword: string = '';

  constructor(private as: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.searchAuthors();
  }

  searchAuthors() {
    this.as.searchAuthors("gr", 1, 100).subscribe(
      {
        next: (resp) => {
          this.authors = resp as Author[];

          this.updateFilteredAuthors();
        },
        error: err => {
          console.log(err);
        }
      }
    );
  }
  paginationElements: number[] = [];
  updatePagination(totalItems: number) {
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.paginationElements = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateFilteredAuthors() {

      const authorsFiltered = this.authors.filter(author =>
        author.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );

      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.authorsFiltered = authorsFiltered.slice(start, end);

    this.updatePagination(authorsFiltered.length);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchKeyword = input.value.trim();
    this.search();
  }

  search() {
    this.currentPage = 1; // Reset to the first page after search
    this.updateFilteredAuthors();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateFilteredAuthors();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredAuthors();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredAuthors();
    }
  }

  getPaginationArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  routerAffect(author: Author) {
    this.router.navigateByUrl("authors/edit", { state: author });
  }
}
