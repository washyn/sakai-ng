import { AbpValidators, ApplicationConfigurationDto, ConfigStateService } from '@abp/ng.core';
import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AbpUtilService } from '@/abp-shared';
import { ErrorSampleService } from '@/proxy/web-app/controllers/error-sample.service';
import { LangComponent } from './lang-component';

@Component({
    selector: 'app-abp-shared-example',
    standalone: true,
    imports: [JsonPipe, ReactiveFormsModule, NgxValidateCoreModule, ButtonModule, InputTextModule, LangComponent],
    templateUrl: './abp-shared-example.html'
})
export class AbpSharedExampleComponent implements OnInit {
    appConfig: ApplicationConfigurationDto = {} as ApplicationConfigurationDto;
    formExample: FormGroup = new FormGroup({});
    protected readonly configState = inject(ConfigStateService);
    protected readonly exampleService = inject(ErrorSampleService);
    protected readonly formBuilder = inject(FormBuilder);
    readonly util = inject(AbpUtilService);

    ngOnInit(): void {
        this.appConfig = this.configState.getAll();

        this.formExample = this.formBuilder.group<{
            filter: FormControl<string | null>;
            name: FormControl<string | null>;
        }>({
            filter: new FormControl<string>('', [Validators.required, Validators.maxLength(10), AbpValidators.emailAddress()]),
            name: new FormControl<string>('', [Validators.required])
        });
    }

    error500() {
        this.exampleService.error500().subscribe();
    }

    error401() {
        this.exampleService.error401().subscribe();
    }

    error403() {
        this.exampleService.error403().subscribe();
    }

    error40XXX() {
        this.exampleService.error40XXXByModelSample({}).subscribe();
    }

    error404() {
        this.exampleService.error404().subscribe();
    }

    errorBusinessException() {
        this.exampleService.errorBusinessException().subscribe();
    }

    largeRequest() {
        this.exampleService.largeRequest().subscribe();
    }

    largeRequestSecondExample() {
        this.util.ui.setBusy();
        this.exampleService
            .largeRequestSecondExample()
            .pipe(finalize(() => this.util.ui.clearBusy()))
            .subscribe();
    }

    requireAuth() {
        this.exampleService.requireAuth().subscribe();
    }

    error400() {
        this.exampleService.error400().subscribe();
    }

    error501() {
        this.exampleService.error501().subscribe();
    }

    save() {
        if (this.formExample.invalid) return;
        console.log(this.formExample.value);
    }

    confirmExample() {
        this.util.message.confirm('Are you sure?', 'Confirm', (isConfirmed) => {
            console.log(isConfirmed);
        });
    }
}
