import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { NotificationStatus } from './notification-status';

@Injectable({
  providedIn: 'root',
})
export class NotificatorService {
  constructor(private messageService: MessageService) {}

  success(message: string, title?: string): void {
    this.showNotification(NotificationStatus.Success, message, title);
  }

  info(message: string, title?: string): void {
    this.showNotification(NotificationStatus.Info, message, title);
  }

  error(message: string, title?: string): void {
    this.showNotification(NotificationStatus.Error, message, title);
  }

  warning(message: string, title?: string): void {
    this.showNotification(NotificationStatus.Warn, message, title);
  }

  clear(): void {
    this.messageService.clear();
  }

  private showNotification(
    status: NotificationStatus,
    message: string,
    title?: string
  ): void {
    const statusString = NotificationStatus[status].toLowerCase();
    const titleString = title ?? NotificationStatus[status].toString();
    const msg: Message = {
      severity: statusString,
      summary: titleString,
      detail: message,
      life: 3500,
      closable: true,
    };

    this.messageService.add(msg);
  }
}
