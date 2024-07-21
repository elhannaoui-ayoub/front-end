import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Author} from "../../../dao/model/Author";
import {Publisher} from "../../../dao/model/Publisher";
import {Category} from "../../../dao/model/Category";
import {AuthorService} from "../../../metier/services/author.service";
import {CategoryService} from "../../../metier/services/category.service";
import {PublisherService} from "../../../metier/services/publisher.service";
import {Book} from "../../../dao/model/Book";
import {BookService} from "../../../metier/services/book.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css']
})
export class NewbookComponent implements OnInit{
  newBookFormGroup! : FormGroup;
  authors:Author[]=[];
  publishers:Publisher[]=[];
  categories:Category[]=[];


  constructor(private fb : FormBuilder,
              private as:AuthorService,
              private cs:CategoryService,

              private  ps:PublisherService,

              private bs:BookService,

              private router:Router

              ) {

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
    this.newBookFormGroup=this.fb.group({
      intitule: this.fb.control(null, [Validators.required]),
      isbn : this.fb.control(null,[Validators.required,]),
      borrowPrice : this.fb.control(null,[Validators.required,]),
      description : this.fb.control(null,[Validators.required]),
      publicationDate: this.fb.control(null,[Validators.required]),
      categories: this.fb.control(null,[Validators.required]),
      authors: this.fb.control(null,[Validators.required]),
      publisher: this.fb.control(null,[Validators.required]),
      image: this.fb.control(null,[Validators.required]),
      status: this.fb.control('ACTIVE',[Validators.required]),
    });
  }
  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0]; // Here we use only the first file (single file)
      this.newBookFormGroup.patchValue({ image: file });
    }
  }
  handleSaveBook(){

    let book:Book=this.newBookFormGroup.value;
      //book.image="";
    console.log(book);
    this.bs.saveBook(book,this.newBookFormGroup.value['image']).subscribe({
      next : data=>{
        alert("book has been successfully saved!");
        //this.newCustomerFormGroup.reset();
        //this.router.navigateByUrl("/customers");
        //this.router.navigateByUrl("/books/list");
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
