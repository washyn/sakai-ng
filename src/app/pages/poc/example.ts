import { AbpValidators, ApplicationConfigurationDto, ConfigStateService } from '@abp/ng.core';
import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { LoaderBarComponent } from './../../shared/components/loader-bar/loader-bar.component';
import { AbpUtilService } from './../../core/abp-utils/abp-util.service';
import { finalize } from 'rxjs';
import { ErrorSampleService } from '@/proxy/web-app/controllers';
// import { ErrorSampleService } from './proxy/web-app/controllers';
// import { LangComponent } from './lang-component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        JsonPipe,
        ReactiveFormsModule,
        NgxValidateCoreModule,
        LoaderBarComponent,
        // LangComponent,
    ],
    template: `
    <abp-loader-bar></abp-loader-bar>
    <hr />

<!-- <abp-spinner></abp-spinner> -->

<form [formGroup]="formExample" (ngSubmit)="save()">
<div class="field">
    <label>TestValue *</label>
    <input type="text" name="testValue" formControlName="filter" />
</div>
<button type="submit">Save</button>
</form>
<hr />
<button (click)="util.notify.info('info', 'title')">Notify info</button>
<button (click)="util.notify.success('success', 'title')">Notify success</button>
<button (click)="util.notify.warn('warn', 'title')">Notify warn</button>
<button (click)="util.notify.error('error', 'title')">Notify error</button>
<hr />
<button (click)="util.message.info('info', 'title')">Message info</button>
<button (click)="util.message.success('success', 'title')">Message success</button>
<button (click)="util.message.warn('warn', 'title')">Message warn</button>
<button (click)="util.message.error('error', 'title')">Message error</button>
<button (click)="confirmExample()">Confirm message</button>
<hr />
add example of ui service

<button (click)="util.ui.block()">Block</button>
<button (click)="util.ui.unblock()">Unblock</button>
<button (click)="util.ui.setBusy()">Set busy</button>
<button (click)="util.ui.clearBusy()">Clear busy</button>
<hr />
<button (click)="error500()">Error 500</button>
<button (click)="error401()">Error 401</button>
<button (click)="error403()">Error 403</button>
<button (click)="error40XXX()">Error 40XXX</button>

<button (click)="error404()">Error 404</button>
<button (click)="errorBusinessException()">Error Business Exception</button>
<button (click)="largeRequest()">Large Request</button>
<button (click)="largeRequestSecondExample()">Req with spinner custom</button>
<button (click)="requireAuth()">Error Require Auth</button>
<button (click)="error400()">Error 400</button>
<button (click)="error501()">Error 501</button>
<hr />
<button (click)="skipHandleError()">Skip handle error</button>
<button (click)="skipHandleErrorSuccess()">Skip handle error success</button>
<hr />

<pre>{{ appConfig | json }}</pre>
    `
})
export class Example implements OnInit {
    protected readonly title = signal('frontapp');
    appConfig: ApplicationConfigurationDto = {} as ApplicationConfigurationDto;
    formExample: FormGroup = new FormGroup({});
    protected readonly configState = inject(ConfigStateService);
    public exampleService = inject(ErrorSampleService);
    public formBuilder = inject(FormBuilder);
    public util = inject(AbpUtilService);

    ngOnInit(): void {
        this.appConfig = this.configState.getAll();

        this.formExample = this.formBuilder.group<{
            filter: FormControl<string | null>;
        }>({
            // NOTA: todos los validadores de abp se deben usar con la invocacacion de funciones ()
            // can be use anything is indipendent why is configured abp DEFAULT_VALIDATION_BLUEPRINTS
            // filter: new FormControl<string>('', [
            //   AbpValidators.required(),
            //   AbpValidators.stringLength({
            //     maximumLength: 3,
            //   }),
            // ]),
            // NOTE: shoud be use angular standar validations same as default theme abp
            filter: new FormControl<string>('', [
                Validators.required,
                Validators.maxLength(10),
                // Validators.email,
                AbpValidators.emailAddress(),
            ]),
        });
    }

    callLargeRequest() {
        this.exampleService.largeRequest().subscribe((res) => {
            console.log('res end request');
        });
        // NOTA: cuando hay 2 suscriptores aun mismo request no se llega a mostrar el loader
        // this.exampleService.largeRequest().subscribe((res) => {});
    }
    ////////////////////////////////////////
    error500() {
        this.exampleService.error500().subscribe((res) => {
            console.log('res 500');
        });
    }

    error401() {
        this.exampleService.error401().subscribe((res) => {
            console.log('res 401');
        });
    }
    error403() {
        this.exampleService.error403().subscribe((res) => {
            console.log('res 403');
        });
    }
    error40XXX() {
        this.exampleService.error40XXXByModelSample({}).subscribe((res) => {
            console.log('res 40XXX');
        });
    }
    error404() {
        this.exampleService.error404().subscribe((res) => {
            console.log('res 404');
        });
    }
    errorBusinessException() {
        this.exampleService.errorBusinessException().subscribe((res) => {
            console.log('res business exception');
        });
    }
    largeRequest() {
        this.exampleService.largeRequest().subscribe((res) => {
            console.log('res large request');
        });
    }

    largeRequestSecondExample() {
        this.util.ui.setBusy();
        this.exampleService
            .largeRequestSecondExample()
            .pipe(finalize(() => this.util.ui.clearBusy()))
            .subscribe((res) => {
                console.log('res large request');
            });
        // if requiered skip handle error, use skip handle error arg in reuest
        // and add two args in suscribe, next and error
    }

    requireAuth() {
        this.exampleService.requireAuth().subscribe((res) => {
            console.log('res require auth');
        });
    }
    error400() {
        this.exampleService.error400().subscribe((res) => {
            console.log('res 400');
        });
    }
    error501() {
        this.exampleService.error501().subscribe((res) => {
            console.log('res 501');
        });
    }

    /////////////////////////

    skipHandleError() {
        // this.exampleService
        //   .error500({
        //     skipHandleError: true,
        //   })
        //   .subscribe(
        //     (res) => {
        //       console.log('next when success');
        //     },
        //     (err) => {
        //       console.log('Custom handled error');
        //       console.log(err);
        //     }
        //   );
    }

    skipHandleErrorSuccess() {
        // this.exampleService
        //   .largeRequest({
        //     skipHandleError: true,
        //   })
        //   .subscribe(
        //     (res) => {
        //       console.log('habdkerd success');
        //     },
        //     (err) => {
        //       console.log('Custom handled error');
        //     }
        //   );
    }

    // https://github.com/abpframework/abp/issues/4560
    ////////////////////////////////////////
    save() {
        // validate form before save
        // if (!this.form.valid || this.modalBusy) return;
        if (this.formExample.invalid) return;
        console.log(this.formExample.value);
    }

    confirmExample() {
        this.util.message.confirm('Are you sure?', 'Confirm', (isConfirmed) => {
            console.log(isConfirmed);
        });
    }
}
