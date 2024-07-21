import { Component } from '@angular/core';
import {Reservation} from "../../../dao/model/Reservation";
import {ClientService} from "../../../metier/services/client.service";

@Component({
  selector: 'app-clientslist',
  templateUrl: './clientslist.component.html',
  styleUrls: ['./clientslist.component.css']
})
export class ClientslistComponent {

  clients:any[]=[];
  clientsFiletered:any[]=[];
  constructor(private cs:ClientService) {
  }
  ngOnInit(): void {
    this.searchClients();
  }

  searchClients() {
    this.cs.searchClients().subscribe({
      next: (resp) => {
        this.clients = resp ;
        this.updateFilteredClients()

      },
      error: err => {
        console.log(err);
      }
    });
  }

  currentPage: number = 1;
  itemsPerPage: number = 3; // Change this to the desired items per page
  totalPages: number = 1;
  searchKeyword: string = '';
  paginationElements: number[] = [];
  updatePagination(totalItems: number) {
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.paginationElements = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateFilteredClients() {

    const categoriesFiltered = this.clients.filter(client =>
      client.username.toLowerCase().includes(this.searchKeyword.toLowerCase())
      &&
      client.id!="a320a85e-be0d-4d84-abb0-a9d930c7aeea"
    );

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.clientsFiletered = categoriesFiltered.slice(start, end);

    this.updatePagination(categoriesFiltered.length);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchKeyword = input.value.trim();
    this.search();
  }

  search() {
    this.currentPage = 1; // Reset to the first page after search
    this.updateFilteredClients();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateFilteredClients();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredClients();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredClients()
    }
  }

  getPaginationArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


}
