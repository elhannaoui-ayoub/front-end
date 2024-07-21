import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PublisherService} from "../../../metier/services/publisher.service";
import {Router} from "@angular/router";
import {Publisher} from "../../../dao/model/Publisher";
import {AuthorService} from "../../../metier/services/author.service";

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit{

  newAuthorFormGroup! : FormGroup;
  constructor(private fb : FormBuilder,private as:AuthorService,private router:Router) {

  }

  ngOnInit(): void {
    this.newAuthorFormGroup=this.fb.group({
      name: this.fb.control(null, [Validators.required]),
    });
  }

  handleSaveAuthor(){
    let author:Publisher=this.newAuthorFormGroup.value;

    this.as.saveAuthor(author).subscribe({
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
