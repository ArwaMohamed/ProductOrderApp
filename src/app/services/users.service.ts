import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  appService = inject(AppService);
  basePath = 'users';
  constructor() { }

  getAllUsers(): Observable<User[]> {
    return this.appService.get<User[]>(this.basePath);
  }
}
