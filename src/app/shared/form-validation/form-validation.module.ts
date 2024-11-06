import {NgModule} from "@angular/core";
import {CoreModule} from "@abp/ng.core";
import {FormValidationComponent} from "./form-validation.component";

@NgModule({
    imports: [CoreModule],
    exports: [],
    declarations: [FormValidationComponent],

})
export class FormValidationModule {}
