import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../model/user';

const AUTH_DATA = "auth_data";

@Injectable({
  providedIn: 'root'

})


export class LoginService {

  private subject = new BehaviorSubject<User | null>(null);

  user$ : Observable<User | null> = this.subject.asObservable();

    isLoggedIn$ : Observable<boolean>;
    isLoggedOut$ : Observable<boolean>;

    constructor(private http: HttpClient) {

        this.isLoggedIn$ = this.user$.pipe(map(user => !!user));

        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

        const user = localStorage.getItem(AUTH_DATA);

        if (user) {
            this.subject.next(JSON.parse(user));
        }

    }

    login(username: string, password: string): Observable<any> {
      return this.http.post<{ token: string }>("https://fakestoreapi.com/auth/login", { username, password })
          .pipe(
              tap(response => {
                  const token = response.token;  
                  localStorage.setItem(AUTH_DATA, JSON.stringify({ token }));  
                  this.subject.next({ token } as any);  
              }),
              shareReplay()
          );
  }
  

    logout() {
        this.subject.next(null);
        localStorage.removeItem(AUTH_DATA);
    }


}
