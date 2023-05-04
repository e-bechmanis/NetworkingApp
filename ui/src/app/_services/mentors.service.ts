import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mentor } from '../_models/mentor';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorsService {
  baseUrl = environment.apiUrl;
  mentors: Mentor[] = [];

  constructor(private http: HttpClient) { }

  getMentors(){
    if (this.mentors.length > 0) return of(this.mentors);
    return this.http.get<Mentor[]>(this.baseUrl + 'users').pipe(
      map(mentors => {
        this.mentors = mentors;
        return mentors;
      })
    );
  }

  getMentor(username: string){
    const mentor = this.mentors.find(user => user.userName === username)
    if(mentor) return of(mentor);
    return this.http.get<Mentor>(this.baseUrl + 'users/' + username);
  }

  updateMentor(mentor: Mentor){
    return this.http.put(this.baseUrl + 'users', mentor).pipe(
      map(() => {
        const index = this.mentors.indexOf(mentor);
        // ... spread operator takes all the elements of the mentor and spreads them,
        // so that we can the whole object back (username, id, etc)
        /// ... the second time ensures that mentor details get updated in the array of mentors
        this.mentors[index] = {...this.mentors[index], ...mentor}
      })
    );
  }
}
