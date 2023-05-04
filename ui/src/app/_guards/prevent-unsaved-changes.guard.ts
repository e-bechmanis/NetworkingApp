import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MentorsEditComponent } from '../mentors/mentors-edit/mentors-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MentorsEditComponent> {
  canDeactivate(component: MentorsEditComponent): boolean {
    if (component.editForm?.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
    }
    return true;
  }
  
}
