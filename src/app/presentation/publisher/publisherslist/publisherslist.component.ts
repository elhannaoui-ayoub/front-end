import {Component, OnInit} from '@angular/core';
import {Category} from "../../../dao/model/Category";

import {Publisher} from "../../../dao/model/Publisher";
import {PublisherService} from "../../../metier/services/publisher.service";
import {Author} from "../../../dao/model/Author";
import {Router} from "@angular/router";
import {AuthorService} from "../../../metier/services/author.service";

@Component({
  selector: 'app-publisherslist',
  templateUrl: './publisherslist.component.html',
  styleUrls: ['./publisherslist.component.css']
})
export class PublisherslistComponent implements OnInit{

  public  publishers : Publisher[]=[];
  publishersFiltered : Publisher[]=[];
  constructor(private ps:PublisherService,private router:Router) {

  }



  routerAffect(publisher : Publisher){
    this.router.navigateByUrl("publishers/edit",{state :publisher});
  }

  currentPage: number = 1;
  itemsPerPage: number = 3; // Change this to the desired items per page
  totalPages: number = 1;
  searchKeyword: string = '';


  ngOnInit(): void {
    this.searchPublishers()
  }

  searchPublishers() {
    this.ps.searchPublishers("gr", 1, 100).subscribe(
      {
        next: (resp) => {
          this.publishers = resp as Author[];

          this.updateFilteredPublishers();
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

  updateFilteredPublishers() {

    const publishersFiltered = this.publishers.filter(publisher =>
      publisher.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.publishersFiltered = publishersFiltered.slice(start, end);

    this.updatePagination(publishersFiltered.length);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchKeyword = input.value.trim();
    this.search();
  }

  search() {
    this.currentPage = 1; // Reset to the first page after search
    this.updateFilteredPublishers();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateFilteredPublishers();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredPublishers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredPublishers();
    }
  }

  getPaginationArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


}
