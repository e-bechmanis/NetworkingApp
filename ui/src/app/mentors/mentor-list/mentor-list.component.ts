import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentor } from 'src/app/_models/mentor';
import { MentorsService } from 'src/app/_services/mentors.service';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.css']
})
export class MentorListComponent implements OnInit {
  mentors$: Observable<Mentor[]> | undefined;

  constructor(private mentorService: MentorsService) { }

  ngOnInit(): void {
    this.mentors$ = this.mentorService.getMentors();
  }

}
