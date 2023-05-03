import { Component, Input, OnInit } from '@angular/core';
import { Mentor } from 'src/app/_models/mentor';

@Component({
  selector: 'app-mentor-card',
  templateUrl: './mentor-card.component.html',
  styleUrls: ['./mentor-card.component.css']
})
export class MentorCardComponent implements OnInit {
  @Input() mentor: Mentor | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
