import { Component, OnInit } from '@angular/core';
import { Reservation } from "../../../dao/model/Reservation";
import { ReservationService } from "../../../metier/services/reservation.service";
import { Router } from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-reservationlist',
  templateUrl: './reservationlist.component.html',
  styleUrls: ['./reservationlist.component.css']
})
export class ReservationlistComponent implements OnInit {
  public reservations: Reservation[] = [];
  public reservationsFiltered: Reservation[] = [];

  currentKeyword: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  paginationElements: number[] = [];

  constructor(private rs: ReservationService, private router: Router,private keycloakService:KeycloakService) {

  }

  ngOnInit(): void {
    this.searchReservations();
  }

  searchReservations() {
    this.rs.searchReservations("gr", 1, 3).subscribe({
      next: (resp) => {
        this.reservations = resp as Reservation[];

        this.filterReservations();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  search(keyword: string) {
    this.currentKeyword = keyword;
    this.currentPage = 1; // Reset to first page
    this.filterReservations();
  }

  onInput2(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search(input.value);
  }

  filterReservations() {
    let filteredReservations = this.reservations.filter((pen) =>
      (this.currentKeyword === '' || pen.reservationStatus === this.currentKeyword)

    );

    if(!this.keycloakService.getUserRoles().includes('ADMIN')){
      filteredReservations = filteredReservations.filter((pen)=> pen.user_id==this.keycloakService.getKeycloakInstance().subject )
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.reservationsFiltered = filteredReservations.slice(start, end);
    this.updatePagination(filteredReservations.length);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterReservations();
    }
  }

  updatePagination(totalItems: number) {
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.paginationElements = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.filterReservations();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterReservations();
    }
  }

  routerAffect(reservation: Reservation) {
    this.router.navigateByUrl("reservations/view", { state: reservation });
  }
}
