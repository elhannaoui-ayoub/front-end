import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../metier/services/category.service";
import {Router} from "@angular/router";
import {Category} from "../../../dao/model/Category";
import {PublisherService} from "../../../metier/services/publisher.service";
import {Publisher} from "../../../dao/model/Publisher";

@Component({
  selector: 'app-new-publisher',
  templateUrl: './new-publisher.component.html',
  styleUrls: ['./new-publisher.component.css']
})
export class NewPublisherComponent {

  newPublisherFormGroup! : FormGroup;
  constructor(private fb : FormBuilder,private ps:PublisherService,private router:Router) {

  }

  ngOnInit(): void {
    this.newPublisherFormGroup=this.fb.group({
      name: this.fb.control(null, [Validators.required]),
    });
  }

  handleSavePublisher(){
    let publisher:Publisher=this.newPublisherFormGroup.value;

    this.ps.savePublisher(publisher).subscribe({
      next : data=>{
        alert("Demande has been successfully saved!");
        //this.newCustomerFormGroup.reset();
        //this.router.navigateByUrl("/customers");
        this.router.navigateByUrl("/publishers/list");
      },
      error : err => {
        console.log(err);
      }
    });
  }


}
