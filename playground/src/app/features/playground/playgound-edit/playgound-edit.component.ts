import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { NotificatorService } from 'src/app/shared/notificator/notificator.service';
import { CreateUserModel, CreateUserResult, GetUserViewModel, PlaygroundForm, UpdateUserModel, UpdateUserResult } from '../playground';
import { PlaygroundService } from '../playground.service';

@Component({
  selector: 'app-playgound-edit',
  templateUrl: './playgound-edit.component.html',
  styleUrl: './playgound-edit.component.scss'
})
export class PlaygoundEditComponent implements OnInit {
  public form!: FormGroup<PlaygroundForm>;
  private $unsubscribe: Subject<void> = new Subject();
  private user$: Observable<GetUserViewModel>;
  public loading: boolean = false;
  private id: string;
  private isNew = false;
  private isEdit = false;
  private isView = false;

  constructor(
    private router: Router,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private playgroundService: PlaygroundService,
    private notificatorService: NotificatorService,
    private cdrRef: ChangeDetectorRef) {      
    const data = this.config.data;
    this.id = data?.id ?? '';
    this.isNew = data?.isNew ?? false;
    this.isEdit = data?.isEdit ?? false;
    this.isView = data?.isView ?? false;
    this.user$ = this.playgroundService.getUser(this.id);
  }
  
  ngOnInit(): void {
    if (this.isEdit) {
      this.loading = true;
      this.user$.pipe(
        takeUntil(this.$unsubscribe),
        tap((user: GetUserViewModel) => {
          this.buildFormGroup(user, this.isView);
          this.loading = false;
          this.cdrRef.detectChanges();
        })
      ).subscribe();
    }
    else {
      this.buildFormGroup(null, this.isView);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmitForm(): void {
    this.markFormAsDirty();
    if (this.form.valid) {
      if (this.isNew) {
        this.playgroundService.createUser(this.mapCreateModel(this.form.controls))
        .pipe(takeUntil(this.$unsubscribe))
        .subscribe((response: CreateUserResult | unknown) => {
          if (response) {
            this.notificatorService.success(`User is created.`, 'Add User');
            this.dialogRef.close(response);
          }
        });
      }
      else if (this.isEdit) {
        this.playgroundService.updateUser(this.id, this.mapUpdateModel(this.form.controls))
        .pipe(takeUntil(this.$unsubscribe))
        .subscribe((response: UpdateUserResult | unknown) => {
          if (response) {
            this.notificatorService.success(`User is updated.`, 'Edit User');
            this.dialogRef.close(response);
          }
        });
      }
    }
    else {
      this.notificatorService.warning('Please fix the highlighted error(s) and try again.');
    }
  }
  
  private markFormAsDirty(): void {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(field => {
        this.form.get(field)?.markAsDirty();
      });
    }
  }

  private buildFormGroup(model: GetUserViewModel | null, disabled: boolean): void {
    this.form = this.formBuilder.nonNullable.group<PlaygroundForm>({
      username: new FormControl({ value: model?.username, disabled }, Validators.required),
      emailAddress: new FormControl({ value: model?.emailAddress, disabled }, Validators.required),
      phoneNumber: new FormControl({ value: model?.phoneNumber ?? '', disabled }, Validators.required),
      skillsets: new FormControl({ value: model?.skillsets ?? '', disabled }, Validators.required),
      hobbies: new FormControl({ value: model?.hobbies ?? '', disabled }, Validators.required),
    });
  }
  
  private mapCreateModel(form: PlaygroundForm): CreateUserModel {
    return {
      username: form.username.value,
      emailAddress: form.emailAddress.value,
      phoneNumber: form.phoneNumber.value,
      skillsets: form.skillsets.value,
      hobbies: form.hobbies.value
    } as CreateUserModel;
  }

  private mapUpdateModel(form: PlaygroundForm): UpdateUserModel {
    return {
      emailAddress: form.emailAddress.value,
      phoneNumber: form.phoneNumber.value,
      skillsets: form.skillsets.value,
      hobbies: form.hobbies.value
    } as CreateUserModel;
  }
}
