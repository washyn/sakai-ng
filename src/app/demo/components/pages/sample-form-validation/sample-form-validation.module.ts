import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleFormValidationRoutingModule } from './sample-form-validation-routing.module';
import { SampleFormValidationComponent } from './sample-form-validation.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { FormValidationModule } from '../../../../shared/form-validation/form-validation.module';
import { CoreModule } from '@abp/ng.core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    imports: [
        CommonModule,
        SampleFormValidationRoutingModule,

        InputTextModule,

        ButtonModule,
        ReactiveFormsModule,
        NgxValidateCoreModule,
        FormValidationModule,
        CoreModule,

        // PrimeNg
        CommonModule,
        FormsModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        CascadeSelectModule,
        MultiSelectModule,
        InputTextareaModule,
        InputTextModule,
    ],
    declarations: [SampleFormValidationComponent],
})
export class SampleFormValidationModule {}
