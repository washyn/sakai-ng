import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { ValidationErrorComponent } from '@ngx-validate/core';
@Component({
    selector: 'app-form-validation',
    template: `
        @for (error of errors; track $index) {
        <small class="p-error">
            {{ error.message }}
        </small>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class FormValidationComponent extends ValidationErrorComponent {}
