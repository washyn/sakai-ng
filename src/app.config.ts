import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { AuthService, provideAbpCore, withOptions } from '@abp/ng.core';
import { CustomAuthService } from './service/custom-auth-service';
import { registerLocaleForEsBuild } from '@abp/ng.core/locale';
import { environment } from './environments/environment';
import { OAuthApiInterceptor, provideAbpUtils } from '@/core';
import { defaultMapErrorsFn, VALIDATION_BLUEPRINTS, VALIDATION_ERROR_TEMPLATE, VALIDATION_INVALID_CLASSES, VALIDATION_MAP_ERRORS_FN, VALIDATION_TARGET_SELECTOR, VALIDATION_VALIDATE_ON_SUBMIT } from '@ngx-validate/core';
import { DEFAULT_VALIDATION_BLUEPRINTS } from '@/constants';
import { CustomValidationErrorComponent } from '@/shared';
import { HTTP_ERROR_CONFIG } from '@/tokens';
import { noop } from '@abp/ng.core';
import { DEFAULT_HANDLERS_PROVIDERS } from '@/providers';
import { ErrorHandler } from '@/handlers';
export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        provideAbpCore(
            withOptions({
                environment,
                registerLocaleFn: registerLocaleForEsBuild()
            })
        ),

        {
            provide: HTTP_INTERCEPTORS,
            useExisting: OAuthApiInterceptor,
            multi: true
        },
        provideAbpUtils(),
        provideAbpCore(
            withOptions({
                environment,
                registerLocaleFn: registerLocaleForEsBuild()
            })
        ),
        {
            provide: AuthService,
            useClass: CustomAuthService
        },
        {
            provide: VALIDATION_VALIDATE_ON_SUBMIT,
            useValue: true
        },
        {
            provide: VALIDATION_MAP_ERRORS_FN,
            useValue: defaultMapErrorsFn
        },
        {
            // componente objetivo selector de clase
            provide: VALIDATION_TARGET_SELECTOR,
            useValue: '.field'
        },
        {
            // clase a agregar incencesario ya que el compontnet ya le agrega, pero se requiere el injector para q compile
            provide: VALIDATION_INVALID_CLASSES,
            useValue: 'field-error-class'
        },
        {
            provide: VALIDATION_BLUEPRINTS,
            // useValue: { ...BLUEPRINTS }, // default
            // para usar con abp y junto con el template para que funcione bien
            useValue: { ...DEFAULT_VALIDATION_BLUEPRINTS }
        },
        {
            provide: VALIDATION_ERROR_TEMPLATE,
            // useValue: ValidationErrorComponent, // default emplate
            useValue: CustomValidationErrorComponent // TODO: fix template
        },
        { provide: HTTP_ERROR_CONFIG, useValue: undefined },
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [ErrorHandler],
            useFactory: noop
        },
        DEFAULT_HANDLERS_PROVIDERS
    ]
};
