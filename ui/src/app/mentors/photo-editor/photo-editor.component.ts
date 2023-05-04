import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Mentor } from 'src/app/_models/mentor';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MentorsService } from 'src/app/_services/mentors.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() mentor: Mentor | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  constructor(private accountService: AccountService, private mentorService: MentorsService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user
      }
    })
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(event:any){
    this.hasBaseDropZoneOver = event;
  }

  setMainPhoto(photo: Photo){
    this.mentorService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.mentor) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.mentor.photoUrl = photo.url;
          this.mentor.photos.forEach(p => {
            if (p.isProfilePhoto) p.isProfilePhoto = false;
            if (p.id === photo.id) p.isProfilePhoto = true;
          })
        }
      }
    })
  }

  deletePhoto(photoId: number){
    this.mentorService.deletePhoto(photoId).subscribe({
      next: () => {
        if (this.mentor){
          this.mentor.photos = this.mentor.photos.filter(x => x.id !== photoId);
        }
      }
    })
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: `Bearer ${this.user?.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    // Adding this to avoid messing with CORS config
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response){
        const photo = JSON.parse(response);
        this.mentor?.photos.push(photo);
      }
    }
  }

}
