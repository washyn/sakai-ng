import { RestService, Rest } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';
import type { ManifestViewModel } from '../../../akdemic/core/common/models';

@Injectable({
  providedIn: 'root',
})
export class ManifestService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  get = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ManifestViewModel>({
      method: 'GET',
      url: '/api/manifest',
    },
    { apiName: this.apiName,...config });
}