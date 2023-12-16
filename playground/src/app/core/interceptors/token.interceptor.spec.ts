import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../services/api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TokenInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenInterceptor,
        Router,
        AuthenticationService,
        ApiService,
        HttpClient,
        HttpHandler
      ],
    });
  });

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

