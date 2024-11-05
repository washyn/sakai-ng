import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SampleFormValidationRoutingModule} from "./sample-form-validation-routing.module";
import {SampleFormValidationComponent} from "./sample-form-validation.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        SampleFormValidationRoutingModule,

        InputTextModule,

        ButtonModule,
        ReactiveFormsModule,
    ],
    declarations: [SampleFormValidationComponent]
})
export class SampleFormValidationModule {
}
