import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { TaskFormComponent } from './task-form/task-form.component';
import { PostService } from '../services/post.service';
import { UserPostMapService } from '../services/userpostmap-service';
import { UserPostMap, Post } from '../models/post.model';
import { AuthService } from '../services/auth.service';

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyTasksComponent implements OnInit  {
  show = false;
  posts: any;
  appliedPosts: any[];
  postedByData: any[];
  notifications: any[];

  constructor(
    public dialog: MatDialog,
    private postService: PostService,
    public authService: AuthService,
    private userPostMapService: UserPostMapService
  ) {

  }

  ngOnInit() {
    this.getAllPosts();
  }
  getTaskStatus(status) {
    let className = '';
    if (status == 'open') {
      className = 'task-status-open';
    } else if (status == 'inprogress') {
      className = 'task-status-inprogress';
    } else {
      className = 'task-status-completed';
    }
    return className;
  }

   getAllPosts() {
    this.show = false;
    this.postService.posts.snapshotChanges().map(changes => {
      return changes.map(c => ({ postId: c.payload.key, ...c.payload.val() }));
    }).subscribe((data: Post[]) => {
      this.show = true;
      this.posts = data.reverse();
      this.postedByData = this.posts.filter(d => d.createdBy == this.authService.currentUserName);
    });
  }

  switchTab($event) {
    if ($event.index == 1) {
      this.getAppliedData ();
    }

    // if($event.index == 0) {
    //   this.getPostedByData();
    // }
  }

  getAppliedData() {
    this.show = false;
    this.userPostMapService.posts.snapshotChanges().map(changes => {
      return changes.map(c => ({ userpostMapId: c.payload.key, ...c.payload.val() }));
    }).subscribe((data: any[]) => {
      this.appliedPosts = [];
      this.show = true;
      // get ids
      const userPostMapData = data.reverse().filter(d => d.appliedUserId == this.authService.currentUserName);
      const postIds = userPostMapData.map(r => r.postId);

      // get posts
      const aPosts = this.posts.filter(r => r.postId == postIds.filter(element => r.postId == element));

      aPosts.forEach(elem => {
        const p = userPostMapData.find(r => r.postId ==elem.postId);
        this.appliedPosts.push({...p, ...elem});
      });

      console.log(this.appliedPosts);
    });
  }


  openNotification(data?: any) {
    this.dialog.open(TaskResponseDialog, {
      data: data,
      width: '500px'
    });
  }

  openEditForm(data) {
    event.stopPropagation();
    this.dialog.open(TaskFormComponent, {
      data: data,
      width: '600px'
    });
  }

  deletePost(post: Post) {
    event.stopPropagation();
    const isConfirm = confirm('Are you sure to want delete');
    if (isConfirm) {
      this.postService.deletePost(post.postId);
    }
  }

  loadNotification(post: any) {
    this.notifications = [];

    this.userPostMapService.posts.snapshotChanges().map(changes => {
      return changes.map(c => ({ userpostMapId: c.payload.key, ...c.payload.val() }));
    }).subscribe((data:UserPostMap[]) => {
      this.notifications = data.reverse().filter(p => p.postId == post.postId);
      console.log(this.notifications);
     })

    // this.userPostMapService.posts.valueChanges().subscribe((data: UserPostMap[]) => {
    //   this.notifications = data.reverse().filter(p => p.postId == post.postId);
    // })

  }
}

@Component({
  templateUrl: './my-task.html',
  styleUrls: ['./my-task.scss']
})
export class TaskResponseDialog {
  award = '';
  constructor(

    public dialogRef: MatDialogRef<TaskResponseDialog>,
    private userpostMapService: UserPostMapService,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public userPostMapData: UserPostMap,
  ) {}

  approve() {
    const approveData = {
      isAssigned: true,
      approvedAt: Date.now(),
      isApproved: true
    }
    this.userpostMapService.updatePost(this.userPostMapData.userpostMapId, approveData);
    this.postService.updatePost(this.userPostMapData.postId, {status:'In Progress'});
    this.dialogRef.close();
  }

  complete() {
    const data = {
      award: this.award,
      completed:true
    }
    this.userpostMapService.updatePost(this.userPostMapData.userpostMapId, data);
    this.postService.updatePost(this.userPostMapData.postId, {status:'Complete'});
    this.dialogRef.close();
  }

}
