import { RestService, Rest } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';
import type { Select2ViewData } from '../../repository/repositories/common/models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  get = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, Select2ViewData[]>({
      method: 'GET',
      url: '/api/users',
    },
    { apiName: this.apiName,...config });
}