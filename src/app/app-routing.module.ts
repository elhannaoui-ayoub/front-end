import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookslistComponent} from "./presentation/book/bookslist/bookslist.component";
import {DashboardComponent} from "./presentation/dashboard/dashboard.component";
import {NewbookComponent} from "./presentation/book/newbook/newbook.component";
import {CategorieslistComponent} from "./presentation/category/categorieslist/categorieslist.component";
import {NewCategoryComponent} from "./presentation/category/new-category/new-category.component";
import {AuthorslistComponent} from "./presentation/author/authorslist/authorslist.component";
import {NewAuthorComponent} from "./presentation/author/new-author/new-author.component";
import {PublisherslistComponent} from "./presentation/publisher/publisherslist/publisherslist.component";
import {NewPublisherComponent} from "./presentation/publisher/new-publisher/new-publisher.component";
import {ReservationlistComponent} from "./presentation/reservation/reservationlist/reservationlist.component";
import {PenaltieslistComponent} from "./presentation/penalty/penaltieslist/penaltieslist.component";
import {EditbookComponent} from "./presentation/book/editbook/editbook.component";
import {EditauthorComponent} from "./presentation/author/editauthor/editauthor.component";
import {EditpublisherComponent} from "./presentation/publisher/editpublisher/editpublisher.component";
import {EditcategoryComponent} from "./presentation/category/editcategory/editcategory.component";
import {NewReservationComponent} from "./presentation/reservation/new-reservation/new-reservation.component";
import {ViewReservationComponent} from "./presentation/reservation/view-reservation/view-reservation.component";
import {EditReservationComponent} from "./presentation/reservation/edit-reservation/edit-reservation.component";
import {ViewBookComponent} from "./presentation/book/view-book/view-book.component";
import {EditPenaltyComponent} from "./presentation/penalty/edit-penalty/edit-penalty.component";
import {AuthGuard} from "./presentation/guards/auth.guard";
import {ClientslistComponent} from "./presentation/client/clientslist/clientslist.component";


const routes: Routes = [
  {path : "books",
    canActivate:[AuthGuard],data:{roles:[]},
    children:[
      {path : "list", component :BookslistComponent},
      {path : "new", component :NewbookComponent},
      {path : "edit", component :EditbookComponent},
      {path : "view", component :ViewBookComponent},
    ]

  },
  {path : "categories",
    canActivate:[AuthGuard],data:{roles:['ADMIN']},
    children:[

      {path : "list", component :CategorieslistComponent},
      {path : "new", component :NewCategoryComponent},
      {path : "edit", component :EditcategoryComponent},
    ]

  },
  {path : "authors",
    canActivate:[AuthGuard],data:{roles:['ADMIN']},
    children:[
      {path : "list", component :AuthorslistComponent},
      {path : "new", component :NewAuthorComponent},
      {path : "edit", component :EditauthorComponent},
    ]

  },
  {path : "publishers",
    canActivate:[AuthGuard],data:{roles:['ADMIN']},
    children:[
      {path : "list", component :PublisherslistComponent},
      {path : "new", component :NewPublisherComponent},
      {path : "edit", component :EditpublisherComponent},
    ]

  },
  {path : "reservations",
    canActivate:[AuthGuard],data:{roles:[]},
    children:[
      {path : "list", component :ReservationlistComponent},
      {path : "new", component :NewReservationComponent},
      {path : "view", component :ViewReservationComponent},
      {path : "edit", component :EditReservationComponent},
    ]
  },
  {path : "penalties",
    canActivate:[AuthGuard],data:{roles:[]},
    children:[
      {path : "list", component :PenaltieslistComponent},

      {path : "edit", component :EditPenaltyComponent},
      //{path : "new", component :NewPublisherComponent},
    ]

  },
  {path : "clients",
  canActivate:[AuthGuard],data:{roles:['ADMIN']},
    children:[
      {path : "list", component :ClientslistComponent},
    ]

  },
  {path : "", component :DashboardComponent,canActivate:[AuthGuard],data:{roles:[]}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
