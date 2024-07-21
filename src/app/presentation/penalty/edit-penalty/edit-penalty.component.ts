import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Author} from "../../../dao/model/Author";
import {AuthorService} from "../../../metier/services/author.service";
import {Router} from "@angular/router";
import {Penalty} from "../../../dao/model/Penalty";
import {PenaltyService} from "../../../metier/services/penalty.service";

@Component({
  selector: 'app-edit-penalty',
  templateUrl: './edit-penalty.component.html',
  styleUrls: ['./edit-penalty.component.css']
})
export class EditPenaltyComponent {
  editPenaltyFormGroup! : FormGroup;
  penalty!:Penalty;
  constructor(private fb : FormBuilder,private ps:PenaltyService,private router:Router) {
    this.penalty=this.router.getCurrentNavigation()?.extras.state as Penalty;
  }

  ngOnInit(): void {
    this.editPenaltyFormGroup=this.fb.group({
      montant: this.fb.control(this.penalty.montant, [Validators.required]),
      penaltyType: this.fb.control(this.penalty.penaltyType, [Validators.required]),
      penaltyStatus: this.fb.control(this.penalty.penaltyStatus, [Validators.required]),
    });
  }



  handleSavePenalty(){
    let penalty:Penalty=this.editPenaltyFormGroup.value;
    penalty.id=this.penalty.id;
    this.ps.saveEditPenalty(penalty).subscribe({
      next : data=>{
        alert("author has been successfully saved!");
        //this.newCustomerFormGroup.reset();
        //this.router.navigateByUrl("/customers");
        this.router.navigateByUrl("/penalties/list");
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
