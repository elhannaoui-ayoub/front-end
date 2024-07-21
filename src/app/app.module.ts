import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BookslistComponent } from './presentation/book/bookslist/bookslist.component';
import {HttpClientModule} from "@angular/common/http";
import {ReservationlistComponent} from "./presentation/reservation/reservationlist/reservationlist.component";
import { DashboardComponent } from './presentation/dashboard/dashboard.component';
import { NewbookComponent } from './presentation/book/newbook/newbook.component';
import { CategorieslistComponent } from './presentation/category/categorieslist/categorieslist.component';
import { PublisherslistComponent } from './presentation/publisher/publisherslist/publisherslist.component';
import { AuthorslistComponent } from './presentation/author/authorslist/authorslist.component';

import { NewCategoryComponent } from './presentation/category/new-category/new-category.component';
import { NewAuthorComponent } from './presentation/author/new-author/new-author.component';
import { NewPublisherComponent } from './presentation/publisher/new-publisher/new-publisher.component';
import { PenaltieslistComponent } from './presentation/penalty/penaltieslist/penaltieslist.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditbookComponent } from './presentation/book/editbook/editbook.component';
import { EditauthorComponent } from './presentation/author/editauthor/editauthor.component';
import { EditpublisherComponent } from './presentation/publisher/editpublisher/editpublisher.component';
import { EditcategoryComponent } from './presentation/category/editcategory/editcategory.component';
import { NewReservationComponent } from './presentation/reservation/new-reservation/new-reservation.component';
import { ViewReservationComponent } from './presentation/reservation/view-reservation/view-reservation.component';
import { EditReservationComponent } from './presentation/reservation/edit-reservation/edit-reservation.component';
import { ViewBookComponent } from './presentation/book/view-book/view-book.component';
import { EditPenaltyComponent } from './presentation/penalty/edit-penalty/edit-penalty.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { ClientslistComponent } from './presentation/client/clientslist/clientslist.component';




function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8090',
        realm: 'bookwise',
        clientId: 'bookwise-frontend'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}


@NgModule({
  declarations: [
    AppComponent,
    BookslistComponent,
    BookslistComponent,
    ReservationlistComponent,
    DashboardComponent,
    NewbookComponent,
    CategorieslistComponent,
    PublisherslistComponent,
    AuthorslistComponent,
    NewCategoryComponent,
    NewAuthorComponent,
    NewPublisherComponent,
    PenaltieslistComponent,
    EditbookComponent,
    EditauthorComponent,
    EditpublisherComponent,
    EditcategoryComponent,
    NewReservationComponent,
    ViewReservationComponent,
    EditReservationComponent,
    ViewBookComponent,
    EditPenaltyComponent,
    ClientslistComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    KeycloakAngularModule
  ],
  providers: [
    {provide : APP_INITIALIZER, useFactory : initializeKeycloak, multi :true, deps : [KeycloakService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
