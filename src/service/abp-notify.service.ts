import { INotifyService } from '@/abp-shared';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AbpNotifyService implements INotifyService {
  constructor(private messageService: MessageService) { }

  private showNotification(type: string, message: string, title?: string, options?: any) {
    if (!title) {
      title = message;
      message = '';
    }
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
      life: 5000,
      ...options,
    });
  }

  info(message: string, title?: string, options?: any): void {
    this.showNotification('info', message, title, options);
  }
  success(message: string, title?: string, options?: any): void {
    this.showNotification('success', message, title, options);
  }
  warn(message: string, title?: string, options?: any): void {
    this.showNotification('warn', message, title, options);
  }
  error(message: string, title?: string, options?: any): void {
    this.showNotification('error', message, title, options);
  }
}
