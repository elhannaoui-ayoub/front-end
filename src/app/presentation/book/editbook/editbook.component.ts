import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Author} from "../../../dao/model/Author";
import {Publisher} from "../../../dao/model/Publisher";
import {Category} from "../../../dao/model/Category";
import {AuthorService} from "../../../metier/services/author.service";
import {CategoryService} from "../../../metier/services/category.service";
import {PublisherService} from "../../../metier/services/publisher.service";
import {BookService} from "../../../metier/services/book.service";
import {Router} from "@angular/router";
import {Book} from "../../../dao/model/Book";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit{
  editBookFormGroup! : FormGroup;
  authors:Author[]=[];
  publishers:Publisher[]=[];
  categories:Category[]=[];
  book!:Book;
  constructor(private fb : FormBuilder,
              private as:AuthorService,
              private cs:CategoryService,

              private  ps:PublisherService,

              private bs:BookService,

              private router:Router


  ) {
    this.book=this.router.getCurrentNavigation()?.extras.state as Book;
  }

  ngOnInit(): void {
    this.as.searchAuthors("gr",1,3).subscribe(
      {
        next:(resp)=>{
          this.authors=resp as Author[];


        },

        error:err => {
          console.log(err);
        }
      }
    );
    this.cs.searchCategories("gr",1,3).subscribe(
      {
        next:(resp)=>{
          this.categories=resp as Category[];
        },

        error:err => {
          console.log(err);
        }
      }
    );
    this.ps.searchPublishers("gr",1,3).subscribe(
      {
        next:(resp)=>{
          this.publishers=resp as Publisher[];
        },

        error:err => {
          console.log(err);
        }
      }
    );


    this.editBookFormGroup=this.fb.group({
      intitule: this.fb.control(this.book.intitule, [Validators.required]),
      isbn : this.fb.control(this.book.isbn,[Validators.required,]),
      borrowPrice : this.fb.control(this.book.borrowPrice,[Validators.required,]),
      description : this.fb.control(this.book.description,[Validators.required]),
      publicationDate: this.fb.control(this.book.publicationDate,[Validators.required]),
      categories: this.fb.control(null,[Validators.required]),
      authors: this.fb.control(null,[Validators.required]),
      publisher: this.fb.control(null,[Validators.required]),
      image: this.fb.control(null,),
      status: this.fb.control(this.book.status,[Validators.required]),
    });
  }

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0]; // Here we use only the first file (single file)
      this.editBookFormGroup.patchValue({ image: file });
    }
  }
  handleSaveBook(){

    let book:Book=this.editBookFormGroup.value;
    book.id=this.book.id;
    console.log(book);
    this.bs.editBook(book,this.editBookFormGroup.value['image']).subscribe({
      next : data=>{
        alert("book has been successfully saved!");

      },
      error : err => {
        console.log(err);
      }
    });
  }


}
