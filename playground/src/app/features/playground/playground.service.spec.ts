import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/core/services/api.service';

import { PlaygroundService } from './playground.service';

describe('PlaygroundService', () => {
  let service: PlaygroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ApiService },
      ]
    });
    service = TestBed.inject(PlaygroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
