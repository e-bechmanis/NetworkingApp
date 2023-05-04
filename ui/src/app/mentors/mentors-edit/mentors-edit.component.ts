import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Mentor } from 'src/app/_models/mentor';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MentorsService } from 'src/app/_services/mentors.service';

@Component({
  selector: 'app-mentors-edit',
  templateUrl: './mentors-edit.component.html',
  styleUrls: ['./mentors-edit.component.css']
})
export class MentorsEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  mentor: Mentor | undefined;
  user: User | null = null;

  constructor(private accountService: AccountService, private mentorService: MentorsService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
   }

  ngOnInit(): void {
    this.loadMentor();
  }

  loadMentor(){
    if (!this.user) return;
    this.mentorService.getMentor(this.user.username).subscribe({
      next: mentor => this.mentor = mentor
    })
  }

  updateMentor(){
    this.mentorService.updateMentor(this.editForm?.value).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.mentor);
      }
    });
  }
}
