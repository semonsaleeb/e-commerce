import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  constructor() { }
  usersUrl = environment.basicUrl+'users/'


  private http =inject(HttpClient) 
  
  
  getAllUsers() {
    return this.http.get<User[]>(this.usersUrl)
  }
}
