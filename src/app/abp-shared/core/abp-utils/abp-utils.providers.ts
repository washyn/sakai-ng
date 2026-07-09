import { Provider, Type } from '@angular/core';
import { IMessageService, INotifyService, IUIService } from './interfaces';
import { ConsoleMessageService } from './console-message.service';
import { ConsoleNotifyService } from './console-notify.service';
import { ConsoleUIService } from './console-ui.service';

export interface AbpUtilsProviderOptions {
  notifyService?: Type<INotifyService>;
  messageService?: Type<IMessageService>;
  uiService?: Type<IUIService>;
}

export function provideAbpUtils(
  options: AbpUtilsProviderOptions = {}
): Provider[] {
  return [
    {
      provide: INotifyService,
      useClass: options.notifyService ?? ConsoleNotifyService,
    },
    {
      provide: IMessageService,
      useClass: options.messageService ?? ConsoleMessageService,
    },
    {
      provide: IUIService,
      useClass: options.uiService ?? ConsoleUIService,
    },
  ];
}
