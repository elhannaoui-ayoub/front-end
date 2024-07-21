import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../metier/services/category.service";
import {Router} from "@angular/router";
import {Category} from "../../../dao/model/Category";

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit{

  editCategoryFormGroup! : FormGroup;
  category!:Category;
  constructor(private fb : FormBuilder,private cs:CategoryService,private router:Router) {
    this.category=this.router.getCurrentNavigation()?.extras.state as Category;
  }

  ngOnInit(): void {
    console.log("hh");
    console.log(this.category.intitule);
    this.editCategoryFormGroup=this.fb.group({
      intitule: this.fb.control(this.category.intitule, [Validators.required]),
    });
  }

  handleSaveCategory(){
    let category:Category=this.editCategoryFormGroup.value;
      category.id=this.category.id;
    this.cs.editCategory(category).subscribe({
      next : data=>{
        alert("Category has been successfully saved!");
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
