import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { NotificatorComponent } from './notificator.component';

describe('NotificatorComponent', () => {
  let component: NotificatorComponent;
  let fixture: ComponentFixture<NotificatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      declarations: [NotificatorComponent],
      providers: []
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
