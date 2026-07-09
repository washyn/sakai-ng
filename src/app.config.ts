import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { AuthService, provideAbpCore, withOptions } from '@abp/ng.core';
import { CustomAuthService } from './service/custom-auth-service';
import { registerLocaleForEsBuild } from '@abp/ng.core/locale';
import { environment } from './environments/environment';
import { provideAbpSharedUtilities } from '@/abp-shared';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch(), withInterceptorsFromDi()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        provideAbpCore(
            withOptions({
                environment,
                registerLocaleFn: registerLocaleForEsBuild()
            })
        ),
        provideAbpSharedUtilities(),
        {
            provide: AuthService,
            useClass: CustomAuthService
        }
    ]
};
