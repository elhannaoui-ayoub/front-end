import { Component } from '@angular/core';
import {Reservation} from "../../../dao/model/Reservation";
import {ReservationService} from "../../../metier/services/reservation.service";
import {Penalty} from "../../../dao/model/Penalty";
import {PenaltyService} from "../../../metier/services/penalty.service";
import {Category} from "../../../dao/model/Category";
import {Author} from "../../../dao/model/Author";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-penaltieslist',
  templateUrl: './penaltieslist.component.html',
  styleUrls: ['./penaltieslist.component.css']
})
export class PenaltieslistComponent {
  public  penalties : Penalty[]=[];
  public  penaltiesFiltered : Penalty[]=[];

  currentKeyword: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;

  totalPages: number = 0;
  paginationElements: number[] = [];
  constructor(private ps:PenaltyService,private router:Router,public keycloakService:KeycloakService) {

  }

  searchPenalties(){
    this.ps.searchPenalties("gr",1,3).subscribe(
      {
        next:(resp)=>{
          this.penalties=resp as Penalty[];

          this.filterPenalties();

        },

        error:err => {
          console.log(err);
        }
      }
    )
  }

  ngOnInit(): void {
    this.searchPenalties();
  }

  search(keyword: string) {
    this.currentKeyword = keyword;
    this.currentPage = 1; // Reset to first page
    this.filterPenalties();
  }


  onInput2(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search(input.value);
  }

  filterPenalties() {


      const filteredPenalties= this.penalties.filter((pen)=>(this.currentKeyword=="" || pen.penaltyType==this.currentKeyword));







    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.penaltiesFiltered = filteredPenalties.slice(start, end);
    this.updatePagination(filteredPenalties.length); // Pass filteredBooks length
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterPenalties();
    }
  }
  updatePagination(totalItems: number) {
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.paginationElements = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.filterPenalties();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterPenalties();
    }
  }
  dropPenalty(penalty:Penalty){
    this.ps.dropPenalty(penalty.id).subscribe({
      next:()=>{
        location.reload();
      }
    })
  }
  routerAffect(penalty: Penalty){
    this.router.navigateByUrl("penalties/edit", { state: penalty });
  }
}
