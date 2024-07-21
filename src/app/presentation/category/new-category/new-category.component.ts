import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../dao/model/Category";
import {CategoryService} from "../../../metier/services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {

  newCategoryFormGroup! : FormGroup;
  constructor(private fb : FormBuilder,private cs:CategoryService,private router:Router) {
  }

  ngOnInit(): void {
    this.newCategoryFormGroup=this.fb.group({
      intitule: this.fb.control(null, [Validators.required]),
    });
  }

  handleSaveCategory(){
    let category:Category=this.newCategoryFormGroup.value;

    this.cs.saveCategory(category).subscribe({
      next : data=>{
        alert("Demande has been successfully saved!");
        //this.newCustomerFormGroup.reset();
        //this.router.navigateByUrl("/customers");
        this.router.navigateByUrl("/categories/list");
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
