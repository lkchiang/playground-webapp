import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { NotificatorService } from './notificator.service';

describe('NotificatorService', () => {
  let service: NotificatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MessageService },
      ]
    });
    service = TestBed.inject(NotificatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
