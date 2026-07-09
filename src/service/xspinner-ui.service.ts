import { IUIService } from '@/abp-shared';
import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class XSpinnerUIService implements IUIService {
  private readonly spinner = inject(NgxSpinnerService);

  block(_elm?: any): void {
    void this.spinner.show();
  }

  unblock(_elm?: any): void {
    void this.spinner.hide();
  }

  setBusy(_elm?: any, optionsOrPromise?: any): void {
    if (optionsOrPromise && typeof optionsOrPromise === 'object' && typeof optionsOrPromise.finally === 'function') {
      void this.spinner.show();
      optionsOrPromise.finally(() => void this.spinner.hide());
      return;
    }

    void this.spinner.show(undefined, optionsOrPromise);
  }

  clearBusy(_elm?: any): void {
    void this.spinner.hide();
  }
}
