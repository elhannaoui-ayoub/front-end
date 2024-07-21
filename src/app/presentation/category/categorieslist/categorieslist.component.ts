import {Component, OnInit} from '@angular/core';


import {Category} from "../../../dao/model/Category";
import {Book} from "../../../dao/model/Book";
import {CategoryService} from "../../../metier/services/category.service";
import {Router} from "@angular/router";
import {Author} from "../../../dao/model/Author";

@Component({
  selector: 'app-categorieslist',
  templateUrl: './categorieslist.component.html',
  styleUrls: ['./categorieslist.component.css']
})
export class CategorieslistComponent implements OnInit{

  public  categories : Category[]=[];
  categoriesFiltered : Category[]=[];
  constructor(private cs:CategoryService, private router:Router) {

  }


  routerAffect(category : Category){
    this.router.navigateByUrl("categories/edit",{state :category});
  }

  currentPage: number = 1;
  itemsPerPage: number = 3; // Change this to the desired items per page
  totalPages: number = 1;
  searchKeyword: string = '';


  ngOnInit(): void {
    this.searchCategories()
  }

  searchCategories() {
    this.cs.searchCategories("gr", 1, 100).subscribe(
      {
        next: (resp) => {
          this.categories = resp as Category[];

          this.updateFilteredCategories();
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

  updateFilteredCategories() {

    const categoriesFiltered = this.categories.filter(publisher =>
      publisher.intitule.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.categoriesFiltered = categoriesFiltered.slice(start, end);

    this.updatePagination(categoriesFiltered.length);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchKeyword = input.value.trim();
    this.search();
  }

  search() {
    this.currentPage = 1; // Reset to the first page after search
    this.updateFilteredCategories();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateFilteredCategories();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredCategories();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredCategories();
    }
  }

  getPaginationArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
