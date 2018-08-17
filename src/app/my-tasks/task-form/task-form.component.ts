import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
    public postForm: FormGroup;
    public post: Post;
    isDialogClosed = false;

    challenges = [
        'Legacy Technology',
        'Process / SDLC',
        'Performance',
        'Business Workflow',
        'Quality Deliverables',
        'Client Support',
        'Regulations',
        'Security Mandate'
    ];
    constructor(
        private fb: FormBuilder,
        private route: Router,
        public dialogRef: MatDialogRef<TaskFormComponent>,
        public authService: AuthService,
        private postService: PostService,
        @Inject(MAT_DIALOG_DATA) public postData: Post) {}

    ngOnInit() {
        this.post = this.postData;
        this.dialogRef.afterClosed().subscribe(result => {
            if (this.isDialogClosed) {
                this.route.navigateByUrl('my-tasks');
                this.isDialogClosed = false;
            }
          });
        this.createForm();
    }
    createForm() {
        this.postForm = this.fb.group({
            postId: [this.post.postId],
            title: [this.post.title, Validators.required],
            description: [this.post.description],
            businessUnit: [this.post.businessUnit],
            estimatedTime: [this.post.estimatedTime],
            businessImpact: [this.post.businessImpact],
            challengeArea: [this.post.challengeArea],
            technologies: [this.post.technologies],
          });
    }

    updateData() {
        // console.log(this.postForm.value);
        this.postForm.value.updatedAt = Date.now();
        this.postService.updatePost(`${this.post.postId}`, this.postForm.value);
        this.dialogRef.close();
    }

    saveData() {
        this.postForm.value.updatedAt = Date.now();
        this.postForm.value.createdAt = Date.now();
        this.postForm.value.createdBy = this.authService.currentUserName;
        this.postForm.value.status = 'Open';
        this.postService.createPost(this.postForm.value);
        this.isDialogClosed = true;
        this.dialogRef.close();

    }
}
