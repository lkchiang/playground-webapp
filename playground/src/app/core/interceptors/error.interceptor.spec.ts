import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotificatorService } from 'src/app/shared/notificator/notificator.service';

describe('ErrorInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorInterceptor,
        Router,
        NotificatorService,
        MessageService,
      ],
    });
  });

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
