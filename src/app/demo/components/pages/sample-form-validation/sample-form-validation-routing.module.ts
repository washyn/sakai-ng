import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SampleFormValidationComponent} from "./sample-form-validation.component";

export const routes: Routes = [{
    path: '',
    component: SampleFormValidationComponent
}]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SampleFormValidationRoutingModule{}
