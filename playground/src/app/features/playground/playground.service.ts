import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { CreateUserModel, CreateUserResult, DeleteUserResult, GetUserViewModel, ListUserViewModel, UpdateUserModel, UpdateUserResult } from './playground';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {
  private readonly url: string = 'users';

  constructor(private apiService: ApiService) { }

  public listUsers(): Observable<ListUserViewModel[]> {
    return this.apiService.getData(`${this.url}`);
  }

  public getUser(id: string): Observable<GetUserViewModel> {
    return this.apiService.getData(`${this.url}/${id}`);
  }

  public createUser(model: CreateUserModel): Observable<CreateUserResult | unknown> {
    return this.apiService.postData(`${this.url}`, model).pipe(map((response) => response));
  }

  public updateUser(id: string, model: UpdateUserModel): Observable<UpdateUserResult | unknown> {
    return this.apiService.putData(`${this.url}/${id}`, model).pipe(map((response) => response));
  }

  public deleteUser(id: string): Observable<DeleteUserResult | unknown> {
    return this.apiService.deleteData(`${this.url}/${id}`).pipe(map((response) => response));
  }
}
