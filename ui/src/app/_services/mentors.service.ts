import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mentor } from '../_models/mentor';

@Injectable({
  providedIn: 'root'
})
export class MentorsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMentors(){
    return this.http.get<Mentor[]>(this.baseUrl + 'users')
  }

  getMentor(username: string){
    return this.http.get<Mentor>(this.baseUrl + 'users/' + username)
  }
}
