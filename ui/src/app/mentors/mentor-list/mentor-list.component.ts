import { Component, OnInit } from '@angular/core';
import { Mentor } from 'src/app/_models/mentor';
import { MentorsService } from 'src/app/_services/mentors.service';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.css']
})
export class MentorListComponent implements OnInit {
  mentors: Mentor[] = []

  constructor(private mentorService: MentorsService) { }

  ngOnInit(): void {
    this.loadMentors();
  }

  loadMentors(){
    this.mentorService.getMentors().subscribe({
      next: mentors => this.mentors = mentors
    })
  }

}
