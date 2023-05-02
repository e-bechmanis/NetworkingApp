//In routing module we defined different routes available in Angular application
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MentorListComponent } from './mentors/mentor-list/mentor-list.component';
import { MentorDetailComponent } from './mentors/mentor-detail/mentor-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'mentors', component: MentorListComponent},
  {path:'mentors/:id', component: MentorDetailComponent},
  {path:'lists', component: ListsComponent},
  {path:'messages', component: MessagesComponent},
  {path:'**', component: HomeComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
