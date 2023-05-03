import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mentor } from 'src/app/_models/mentor';
import { MentorsService } from 'src/app/_services/mentors.service';

@Component({
  selector: 'app-mentor-detail',
  templateUrl: './mentor-detail.component.html',
  styleUrls: ['./mentor-detail.component.css']
})
export class MentorDetailComponent implements OnInit {
  mentor: Mentor | undefined;

  // ActivateRoute to access username in /mentors/:username route
  constructor(private mentorService: MentorsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMentor();
  }

  loadMentor(){
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.mentorService.getMentor(username).subscribe({
      next: mentor => this.mentor = mentor
    })
  }

}
