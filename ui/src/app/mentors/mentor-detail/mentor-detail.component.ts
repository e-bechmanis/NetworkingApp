import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Mentor } from 'src/app/_models/mentor';
import { MentorsService } from 'src/app/_services/mentors.service';

@Component({
  selector: 'app-mentor-detail',
  templateUrl: './mentor-detail.component.html',
  styleUrls: ['./mentor-detail.component.css']
})
export class MentorDetailComponent implements OnInit {
  mentor: Mentor | undefined;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  // ActivateRoute to access username in /mentors/:username route
  constructor(private mentorService: MentorsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMentor();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  getImages(){
    if (!this.mentor) return [];
    const imageUrls = [];
    for (const photo of this.mentor.photos){
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imageUrls;
  }

  loadMentor(){
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.mentorService.getMentor(username).subscribe({
      next: mentor => {
        this.mentor = mentor;
        this.galleryImages = this.getImages();
      }
    })
  }

}
