import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UploadFileService } from '../../services/upload-file.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class UserProfileContentComponent {
  profileForm: FormGroup;
  user: User;
  private _isLoading;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public authService: AuthService,
    private uploadService: UploadFileService
  ) {
      this.user = userService.currentUser;
      if(this.user) {
      this.createForm(); 
    }
  }

  get isLoading() {
    return this.uploadService.isLoading;
  }

  createForm() {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.email],
      gender: [this.user.gender],
      designation: [this.user.designation],
      businessUnit: [this.user.businessUnit],
      description: [this.user.description],
      skills: [this.user.skills]
    });
  }

  uploadFile($event) {
    this.uploadService.uploadFile($event.target.files[0]);
  }

  submitForm() {
    this.userService.updateUser(this.user.userId , this.profileForm.value)
  }
}
