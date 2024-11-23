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
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { SliderModule } from 'primeng/slider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipModule } from 'primeng/chip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ColorPickerModule } from 'primeng/colorpicker';

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
        InputGroupModule,
        InputGroupAddonModule,
        RatingModule,
        SelectButtonModule,
        CheckboxModule,
        KnobModule,
        ListboxModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        ColorPickerModule,
        CascadeSelectModule,
        MultiSelectModule,
        ToggleButtonModule,
        SliderModule,
        InputTextareaModule,
        RadioButtonModule,
        InputTextModule,
        RatingModule,
        ChipModule,
        KnobModule,
        InputSwitchModule,
        ListboxModule,
        SelectButtonModule,
        CheckboxModule,
        ButtonModule,
        InputGroupModule,
        InputGroupAddonModule,
    ],
    declarations: [SampleFormValidationComponent],
})
export class SampleFormValidationModule {}
