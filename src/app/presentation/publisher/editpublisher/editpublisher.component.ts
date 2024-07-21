import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PublisherService} from "../../../metier/services/publisher.service";
import {Router} from "@angular/router";
import {Publisher} from "../../../dao/model/Publisher";
import {Author} from "../../../dao/model/Author";

@Component({
  selector: 'app-editpublisher',
  templateUrl: './editpublisher.component.html',
  styleUrls: ['./editpublisher.component.css']
})
export class EditpublisherComponent {

  editPublisherFormGroup! : FormGroup;
  publisher!:Publisher;
  constructor(private fb : FormBuilder,private ps:PublisherService,private router:Router) {
    this.publisher=this.router.getCurrentNavigation()?.extras.state as Publisher;
  }

  ngOnInit(): void {
    this.editPublisherFormGroup=this.fb.group({
      name: this.fb.control(this.publisher.name, [Validators.required]),
    });
  }

  handleSavePublisher(){
    let publisher:Publisher=this.editPublisherFormGroup.value;
    publisher.id=this.publisher.id;
    this.ps.editPublisher(publisher).subscribe({
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
