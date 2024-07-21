import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorService} from "../../../metier/services/author.service";
import {Router} from "@angular/router";
import {Publisher} from "../../../dao/model/Publisher";
import {Book} from "../../../dao/model/Book";
import {Author} from "../../../dao/model/Author";

@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent {
  editAuthorFormGroup! : FormGroup;
  author!:Author;
  constructor(private fb : FormBuilder,private as:AuthorService,private router:Router) {
    this.author=this.router.getCurrentNavigation()?.extras.state as Author;
  }

  ngOnInit(): void {
    this.editAuthorFormGroup=this.fb.group({
      name: this.fb.control(this.author.name, [Validators.required]),
    });
  }

  handleSaveAuthor(){
    let author:Author=this.editAuthorFormGroup.value;
    author.id=this.author.id;
    this.as.editAuthor(author).subscribe({
      next : data=>{
        alert("author has been successfully saved!");
        //this.newCustomerFormGroup.reset();
        //this.router.navigateByUrl("/customers");
        this.router.navigateByUrl("/authors/list");
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
