import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {CoreModule} from "@abp/ng.core";
import {environment} from "../environments/environment";
import {registerLocale} from "@abp/ng.core/locale";
import {NgxValidateCoreModule} from "@ngx-validate/core";
import {FormValidationModule} from "./shared/form-validation/form-validation.module";
import {FormValidationComponent} from "./shared/form-validation/form-validation.component";

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CoreModule.forRoot({
            environment,
            registerLocaleFn: registerLocale(),
        }),
        NgxValidateCoreModule.forRoot({
            // invalidClasses:"",
            validateOnSubmit: true,
            // TODO: check how to work another clases for validation...
            targetSelector:".form-group-custom",// CRITERIA FOR ADD ELEMENT VALIDATION ???
            // targetSelector:".field",
            // class=""
            errorTemplate: FormValidationComponent,
            blueprints:{
                pattern:"Patrón no válido. Por favor, revise su entrada."
            }
        }),
        FormValidationModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

// export const BLUEPRINTS = {
//     email: 'Please enter a valid email address.',
//     max: 'Max. value should be {{ max }}. ({{ actual }} entered)',
//     maxlength:
//         'Max. {{ requiredLength }} characters are allowed. (has {{ actualLength }})',
//     min: 'Min. value should be {{ min }}. ({{ actual }} entered)',
//     minlength:
//         'Min. {{ requiredLength }} characters are required. (has {{ actualLength }})',
//     pattern: 'Invalid pattern. Please review your input.',
//     required: 'This field is required.',
//     passwordMismatch: 'Passwords do not match.',
//     invalidPassword: 'Password should include {{ description }}.',
// };
