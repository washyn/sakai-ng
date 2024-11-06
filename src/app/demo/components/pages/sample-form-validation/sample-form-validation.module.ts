import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SampleFormValidationRoutingModule} from "./sample-form-validation-routing.module";
import {SampleFormValidationComponent} from "./sample-form-validation.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxValidateCoreModule} from "@ngx-validate/core";
import {FormValidationModule} from "../../../../shared/form-validation/form-validation.module";
import {CoreModule} from "@abp/ng.core";

@NgModule({
    imports: [
        CommonModule,
        SampleFormValidationRoutingModule,

        InputTextModule,

        ButtonModule,
        ReactiveFormsModule,
        NgxValidateCoreModule,
        FormValidationModule,
        CoreModule
    ],
    declarations: [SampleFormValidationComponent]
})
export class SampleFormValidationModule {
}
