import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AppModule } from 'src/app/app.module';
import { NotificatorService } from 'src/app/shared/notificator/notificator.service';

import { PlaygoundEditComponent } from './playgound-edit.component';

describe('PlaygoundEditComponent', () => {
  let component: PlaygoundEditComponent;
  let fixture: ComponentFixture<PlaygoundEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      declarations: [PlaygoundEditComponent],
      providers: [DynamicDialogRef, DynamicDialogConfig, NotificatorService, MessageService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaygoundEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
