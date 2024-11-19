import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-sample-form-validation',
    templateUrl: './sample-form-validation.component.html',
    styleUrl: './sample-form-validation.component.scss',
})
export class SampleFormValidationComponent {
    selectedState: any = null;

    states: any[] = [
        { name: 'Arizona', code: 'Arizona' },
        { name: 'California', value: 'California' },
        { name: 'Florida', code: 'Florida' },
        { name: 'Ohio', code: 'Ohio' },
        { name: 'Washington', code: 'Washington' },
    ];

    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' },
    ];

    cities1: any[] = [];

    cities2: any[] = [];

    city1: any = null;

    city2: any = null;
    ////////////////////////////////////////////////////////////
    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.buildForm();
        this.buildForms();
    }

    // todo: test with all form elements...
    buildForm() {
        this.formGroup = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            age: new FormControl('', [
                Validators.required,
                Validators.pattern(/^\d{8}$/),
            ]),
        });
    }

    onSubmit() {
        console.log('submited form');
        if (this.formGroup.invalid) {
            console.log('invalid');
            console.log(this.formGroup.invalid);
            return;
        }
        console.log('valid');
        console.log(this.formGroup.invalid);
    }

    ////////////////////////////////////////////////////////////
    formGroupVertical: FormGroup;
    formGroupHorizontal: FormGroup;
    formGroupVerticalGrid: FormGroup;
    formGroupInline: FormGroup;
    formGroupHelpText: FormGroup;
    formGroupAdvanced: FormGroup;

    buildForms() {
        this.formGroupVertical = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            age: new FormControl('', [
                Validators.required,
                Validators.pattern(/^\d{8}$/),
            ]),
        });

        this.formGroupHorizontal = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
        });

        this.formGroupVerticalGrid = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
        });

        this.formGroupInline = this.formBuilder.group({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
        });

        this.formGroupHelpText = this.formBuilder.group({
            username: new FormControl('', Validators.required),
        });

        this.formGroupAdvanced = this.formBuilder.group({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            zip: new FormControl('', Validators.required),
        });
    }

    formGroupVerticalSubmit() {}
    formGroupHorizontalSubmit() {}
    formGroupVerticalGridSubmit() {}
    formGroupInlineSubmit() {}
    formGroupHelpTextSubmit() {}
    formGroupAdvancedSubmit() {}

    // TODO: add another form controls for validation
}
