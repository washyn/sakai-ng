import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderBarComponent } from '@/abp-shared';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, LoaderBarComponent, Toast, ConfirmDialog, NgxSpinnerComponent],
    template: `
        <abp-loader-bar />
        <router-outlet></router-outlet>
        <p-toast position="bottom-right"></p-toast>
        <p-confirmDialog [style]="{ width: '30rem' }" [position]="'center'"></p-confirmDialog>
        <ngx-spinner type="ball-clip-rotate" size="medium" color="#fff"></ngx-spinner>
    `
})
export class AppComponent { }
