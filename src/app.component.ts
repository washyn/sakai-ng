import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderBarComponent } from '@/abp-shared';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, LoaderBarComponent],
    template: `
        <abp-loader-bar />
        <router-outlet></router-outlet>
    `
})
export class AppComponent { }
