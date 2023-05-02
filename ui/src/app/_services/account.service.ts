import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = "https://localhost:5001/api/"
  // User | null is a union type, where a thing can be of 1 or more types
  private CurrentUserSource = new BehaviorSubject<User | null>(null);
  // it is a convention to user $ to signify an Observable
  currentUser$ = this.CurrentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
          this.CurrentUserSource.next(user);
        }
      }
    ))
  }

  setCurrentUser(user: User){
    this.CurrentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null);
  }
}
