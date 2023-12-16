import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PlaygoundEditComponent } from './playgound-edit/playgound-edit.component';
import { ListUserViewModel } from './playground';
import { PlaygroundService } from './playground.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss',
  providers: [DialogService]
})
export class PlaygroundComponent implements OnInit, OnDestroy{
  private $unsubscribe: Subject<void> = new Subject();
  private users$: Observable<ListUserViewModel[]>;
  public users: ListUserViewModel[] = [];
  public loading: boolean = false;
  public kebabMenu: MenuItem[] = [];
  public canAdd = false;
  public canEdit = false;
  public canDelete = false;

  constructor(
    private playgroundService: PlaygroundService,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService,
    private cdrRef: ChangeDetectorRef) {
      this.users$ = this.playgroundService.listUsers();
      const role = this.authenticationService.getRole();
      if (role === 'Admin') {
        this.canAdd = true;
        this.canEdit = true;
        this.canDelete = true;
      }
      this.addKebabMenu();
  }

  ngOnInit(): void {
    this.refreshUsers();
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  onMenuShow(rowData: any): void {
    this.kebabMenu.forEach((menuItem) => {
      menuItem.state = rowData;
    });
  }
  
  addKebabMenu(): void {
    this.kebabMenu = [
      {
        visible: !this.canEdit,
        label: 'View User',
        icon: 'pi pi-user',
        command: (event) => {
          this.openPlaygroundEditDialog(event.item?.state);
        }
      },
      {
        visible: this.canEdit,
        label: 'Edit User',
        icon: 'pi pi-user-edit',
        command: (event) => {
          this.openPlaygroundEditDialog(event.item?.state);
        }
      },
      {
        visible: this.canDelete,
        label: 'Delete User',
        icon: 'pi pi-user-minus',
        command: (event) => {
          this.playgroundService.deleteUser(event.item?.state?.['id'] ?? '').subscribe(() => {
            this.refreshUsers();
          });
        }
      }
    ];
  }

  openPlaygroundEditDialog(data: any | null) {
    const cloneObj: any = { ...data };
    cloneObj.isView = !this.canAdd;
    cloneObj.isNew = (data === null);
    cloneObj.isEdit = (data !== null);
    const ref = this.dialogService.open(PlaygoundEditComponent, {
      header: (!this.canAdd) ? 'View User' : data ? 'Edit User' : 'New User',
      width: '60%',
      height: '100%',
      data: cloneObj,
      baseZIndex: 1000
    });

    ref.onClose.subscribe((result?: any) => {
      if (result) {
        this.refreshUsers();
      }
    });
  }

  refreshUsers(): void {
    this.loading = true;
    this.users$.pipe(
      takeUntil(this.$unsubscribe),
      tap((users: ListUserViewModel[]) => {
        this.users = users;
        this.loading = false;
        this.cdrRef.detectChanges();
      })
    ).subscribe();
  }

  addUser(): void {
    this.openPlaygroundEditDialog(null);
  }
}
