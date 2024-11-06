import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sample-form-validation',
  templateUrl: './sample-form-validation.component.html',
  styleUrl: './sample-form-validation.component.scss'
})
export class SampleFormValidationComponent {
    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.buildForm();
    }

    // todo: test with all form elements...
    buildForm(){
        this.formGroup = this.formBuilder.group({
            name: new FormControl("", Validators.required),
            email: new FormControl("", Validators.required),
            age: new FormControl("", [Validators.required, Validators.pattern(/^\d{8}$/)]),
        })
    }

    onSubmit() {
        console.log("submited form");
        if(this.formGroup.invalid){
            console.log("invalid");
            console.log(this.formGroup.invalid);
            return;
        }
        console.log("valid");
        console.log(this.formGroup.invalid);
    }
}
