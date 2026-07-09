import { Confirmation, CustomHttpErrorHandlerService, ErrorScreenErrorCodes } from '../models';
import {
  CUSTOM_HTTP_ERROR_HANDLER_PRIORITY,
  DEFAULT_ERROR_LOCALIZATIONS,
  DEFAULT_ERROR_MESSAGES,
} from '../constants/default-errors';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService, LocalizationParam, LocalizationService } from '@abp/ng.core';
import { Observable, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
// import { ConfirmationService } from './confirmation.service';
import { CreateErrorComponentService } from './create-error-component.service';
import { AbpUtilService } from '../core/abp-utils/abp-util.service';

@Injectable({ providedIn: 'root' })
export class StatusCodeErrorHandlerService implements CustomHttpErrorHandlerService {
  // protected readonly confirmationService = inject(ConfirmationService);
  protected readonly createErrorComponentService = inject(CreateErrorComponentService);
  protected readonly authService = inject(AuthService);
  protected readonly abpUtilService = inject(AbpUtilService);
  protected readonly localizationService = inject(LocalizationService);

  protected readonly handledStatusCodes = [401, 403, 404, 500] as const;
  protected status: ErrorScreenErrorCodes = 0;

  readonly priority = CUSTOM_HTTP_ERROR_HANDLER_PRIORITY.normal;

  protected navigateToLogin(): void {
    this.authService.navigateToLogin();
  }

  protected showConfirmation(
    message: LocalizationParam,
    title: LocalizationParam
  ): Observable<Confirmation.Status> {
    // return this.confirmationService.error(message, title, {
    //   hideCancelBtn: true,
    //   yesText: 'AbpAccount::Close',
    // });

    // TODO: aply localization, can be use default localization
    let messageLocalized = this.localizationService.instant(message);
    let titleLocalized = this.localizationService.instant(title);

    this.abpUtilService.message.error(messageLocalized, titleLocalized);

    return of(Confirmation.Status.confirm);
  }

  protected showPage(): void {
    const key =
      this.status !== 0
        ? (`defaultError${this.status}` as keyof typeof DEFAULT_ERROR_LOCALIZATIONS)
        : 'defaultError';
    const shouldRemoveDetail = [401, 404].indexOf(this.status) > -1;
    const instance: {
      title: { key: string; defaultValue: string };
      details?: { key: string; defaultValue: string };
      status: ErrorScreenErrorCodes;
    } = {
      title: {
        key: DEFAULT_ERROR_LOCALIZATIONS[key]?.title,
        defaultValue: DEFAULT_ERROR_MESSAGES[key]?.title,
      },
      status: this.status,
    };

    if (!shouldRemoveDetail) {
      instance.details = {
        key: DEFAULT_ERROR_LOCALIZATIONS[key]?.details,
        defaultValue: DEFAULT_ERROR_MESSAGES[key]?.details,
      };
    }

    this.createErrorComponentService.execute(instance);
  }

  canHandle(error: unknown): boolean {
    const status =
      error instanceof HttpErrorResponse
        ? error.status
        : (error as { status?: number } | null)?.status;

    this.status = (status ?? 0) as ErrorScreenErrorCodes;
    return (this.handledStatusCodes as readonly number[]).includes(this.status);
  }

  execute(): void {
    const key = `defaultError${this.status}` as keyof typeof DEFAULT_ERROR_LOCALIZATIONS;
    const title = {
      key: DEFAULT_ERROR_LOCALIZATIONS[key]?.title,
      defaultValue: DEFAULT_ERROR_MESSAGES[key]?.title,
    };
    const message = {
      key: DEFAULT_ERROR_LOCALIZATIONS[key]?.details,
      defaultValue: DEFAULT_ERROR_MESSAGES[key]?.details,
    };

    const canCreateCustomError = this.createErrorComponentService.canCreateCustomError(this.status);

    switch (this.status) {
      case 401:
      case 404:
        if (canCreateCustomError) {
          this.showPage();
          break;
        }

        if (this.status === 401) {
          this.authService.navigateToLogin();
          break;
        }

        this.showConfirmation(message, title).subscribe();
        break;
      case 403:
      case 500:
        this.showPage();
        break;
    }
  }
}
