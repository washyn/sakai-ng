import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';

@Component({
    selector: 'app-sample-form-validation',
    templateUrl: './sample-form-validation.component.html',
    styleUrl: './sample-form-validation.component.scss',
})
export class SampleFormValidationComponent implements OnInit {
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

    constructor(
        private formBuilder: FormBuilder,
        private countryService: CountryService
    ) {
        this.buildForms();
    }
    ngOnInit(): void {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });

        this.cities = [
            {
                label: 'New York',
                value: { id: 1, name: 'New York', code: 'NY' },
            },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            {
                label: 'Istanbul',
                value: { id: 4, name: 'Istanbul', code: 'IST' },
            },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } },
        ];

        this.paymentOptions = [
            { name: 'Option 1', value: 1 },
            { name: 'Option 2', value: 2 },
            { name: 'Option 3', value: 3 },
        ];
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

    ////////////////////////////////////////////////////////

    countries: any[] = [];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];

    valSlider = 50;

    valColor = '#424242';

    valRadio: string = '';

    valCheck: string[] = [];

    valCheck2: boolean = false;

    valSwitch: boolean = false;

    cities: SelectItem[] = [];

    selectedList: SelectItem = { value: '' };

    selectedDrop: SelectItem = { value: '' };

    selectedMulti: any[] = [];

    valToggle = false;

    paymentOptions: any[] = [];

    valSelect1: string = '';

    valSelect2: string = '';

    valueKnob = 20;

    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}
