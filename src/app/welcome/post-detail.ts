import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { SubmitRequestComponent } from './submit.request';
import { UserPostMapService } from '../services/userpostmap-service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.html',
  styleUrls: ['./post-details.scss']
})

export class PostDetailComponent {
  post:any
  isApplied = [];
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    public dialog: MatDialog,
    public authService: AuthService,
    public userpostMapService: UserPostMapService
   ) {}

ngOnInit() {
    this.route.params.subscribe(params => {

      this.postService.getPost(params ["postId"]).snapshotChanges().map(c => {
        return { postId: c.payload.key, ...c.payload.val() }
      }).subscribe((d) => {
        this.post = d;
        this.userpostMapService.posts.valueChanges().subscribe((data) => {
            this.isApplied = data.filter(a => a.postId == this.post.postId && a.appliedUserId ==this.authService.currentUserName);
        })
        
        console.log('post is ', this.post)
      })
    });
}


openApplyForm(data){
  this.dialog.open(SubmitRequestComponent, {
    data: data,
    width:'600px'
  })
}
}
