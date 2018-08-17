import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { TaskResponseDialog } from '../my-tasks/my-tasks.component';
import { UserPostMap } from '../models/post.model';
import { UserPostMapService } from '../services/userpostmap-service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'submit-request',
  templateUrl: './submit-request.html',
  styles: [`
  .form {
    min-width: 150px;
    max-width: 500px;
    width: 100%;
  }
  
  .mat-form-field {
    width: 100%;
  }

  `]
})

export class SubmitRequestComponent {
  post:any;
  estimate = '';
  comment = '';
  isDialogClosed = false;

  constructor(
    public dialogRef: MatDialogRef<TaskResponseDialog>,
    private route: Router,
    private userPostMapService: UserPostMapService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public userPostMapData: UserPostMap) {
      this.dialogRef.afterClosed().subscribe(result => {
        if (this.isDialogClosed) {
            this.route.navigateByUrl('my-tasks');
            this.isDialogClosed = false;
        }
      });
    }

    onFormsubmit() {
      const updateData = {
        appliedUserComment: this.comment,
        appliedUserETA: this.estimate,
        appliedUserId: this.authService.currentUserName,
        appliedAt: Date.now(),
        postId: this.userPostMapData.postId
        
      }

      this.userPostMapService.createPost(updateData);
      this.isDialogClosed = true;
      this.dialogRef.close();

    }
}


