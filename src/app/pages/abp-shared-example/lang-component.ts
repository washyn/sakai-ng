import {
    ConfigStateService,
    LanguageInfo,
    LocalizationPipe,
    SessionStateService
} from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

@Component({
    selector: 'app-lang-component',
    standalone: true,
    imports: [CommonModule, LocalizationPipe],
    template: `
        <div class="rounded-border border border-surface p-4">
            <div class="font-semibold">{{ 'HelpDesk::Welcome' | abpLocalization }}</div>
            <div class="text-sm text-muted-color mt-2">Cambiar idioma recarga la pagina para mostrar el efecto.</div>
            <div class="mt-2">Idioma actual: {{ defaultLanguage$ | async }}</div>
            <div class="flex flex-wrap gap-2 mt-3">
                <button
                    type="button"
                    class="px-3 py-2 border rounded"
                    *ngFor="let language of dropdownLanguages$ | async"
                    (click)="onChangeLang(language.cultureName || '')"
                >
                    {{ language.displayName }}
                </button>
            </div>
        </div>
    `
})
export class LangComponent {
    protected readonly sessionState = inject(SessionStateService);
    protected readonly configState = inject(ConfigStateService);

    languages$ = this.configState.getDeep$('localization.languages');

    get defaultLanguage$() {
        return this.languages$.pipe(
            map((languages: LanguageInfo[] | undefined) => languages?.find((lang) => lang.cultureName === this.selectedLangCulture)?.displayName || '')
        );
    }

    get dropdownLanguages$() {
        return this.languages$.pipe(
            map((languages: LanguageInfo[] | undefined) => languages?.filter((lang) => lang.cultureName !== this.selectedLangCulture) || [])
        );
    }

    get selectedLangCulture(): string {
        return this.sessionState.getLanguage();
    }

    onChangeLang(cultureName: string) {
        this.sessionState.setLanguage(cultureName);
        window.location.reload();
    }
}
