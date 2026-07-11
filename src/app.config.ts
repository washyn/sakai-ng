import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideSpinnerConfig } from 'ngx-spinner';
import { appRoutes } from './app.routes';
import { AuthService, provideAbpCore, withOptions } from '@abp/ng.core';
import { AbpMessageService } from './service/abp-message.service';
import { AbpNotifyService } from './service/abp-notify.service';
import { XSpinnerUIService } from './service/xspinner-ui.service';
import { registerLocale, registerLocaleForEsBuild } from '@abp/ng.core/locale';
import { environment } from './environments/environment';
import { provideAbpSharedUtilities } from '@/abp-shared';
import { PrimeValidationErrorComponent } from './service/prime-validation-component';
import { AuthApiInterceptor } from './service/api.interceptor';
import { JwtAuthService } from './service/custom-auth.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch(), withInterceptorsFromDi()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        provideSpinnerConfig({ type: 'ball-clip-rotate' }),
        provideAbpCore(
            withOptions({
                environment,
                registerLocaleFn: registerLocale()
            })
        ),
        provideAbpSharedUtilities({
            notifyService: AbpNotifyService,
            messageService: AbpMessageService,
            uiService: XSpinnerUIService,
            // cehck layout form or crud page as example form
            // validationTargetSelector: '.flex.flex-col.gap-2',// customizar selector de validación wraper
            validationTargetSelector: null, // en abp usa form-group que no existe, y en el oficial tambien, pero tambien en el repo se pone como nulo para test
            validationErrorComponent: PrimeValidationErrorComponent,
            registerHttpInterceptor: false // TODO: add custom with jwt token
        }),
        provideRouter([], withComponentInputBinding()),
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: AuthApiInterceptor,
            multi: true
        },
        MessageService,
        ConfirmationService,
        {
            provide: AuthService,
            useClass: JwtAuthService
        }
    ]
};
