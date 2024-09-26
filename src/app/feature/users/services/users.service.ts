import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../model/user';
import { Observable } from 'rxjs';

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

  getUserById(UserId: number) {
    return this.http.get<User>(`${this.usersUrl}${UserId}`);
  }


updateUser(userId: number, updatedData: User): Observable<any> {
  return this.http.get<User>(`${this.usersUrl}${userId}`);
}

  deleteUser(User_id:number){
     console.log("services delete");
     return this.http.delete(this.usersUrl+ User_id)
    
  }

  editUser(User_id: number, updatedUser: any) {
    console.log("Service edit called");
    return this.http.put(this.usersUrl + User_id, updatedUser);
  }

  addNewUser(User: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, User);
  }

}
