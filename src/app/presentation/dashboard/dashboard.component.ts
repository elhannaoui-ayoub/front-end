import {Component, OnInit} from '@angular/core';
import {StatisticService} from "../../metier/services/statistic.service";
import {KeycloakService} from "keycloak-angular";
import {ClientService} from "../../metier/services/client.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements  OnInit{
  data:any;
  usersCount!:number;
  constructor(private ss:StatisticService,public keycloakService:KeycloakService,private cs:ClientService) {
  }
  ngOnInit(): void {
    this.ss.getStatistique().subscribe({
      next:(val)=>{
        this.data=val;
      }
    })

    this.cs.searchClients().subscribe({
      next: (resp) => {
        this.usersCount = (resp as []).length ;


      },
      error: err => {
        console.log(err);
      }
    });
  }




}
