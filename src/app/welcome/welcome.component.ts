import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import { PostService } from '../services/post.service';
import { UserPostMapService } from '../services/userpostmap-service';
import { TaskFormComponent } from '../my-tasks/task-form/task-form.component';
import { Post } from '../models/post.model';
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import {startWith, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap'
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-test',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class WelcomeComponent implements OnInit{
  show = false;
  posts: any;
  filteredPost: any;
  searchControl = new FormControl();
  items = [{
    title:'This is first post',
    Description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    createdBy:'Lokesh Daiya',
    createdByEmpId:'e5313410',
    createdByEmailId:'lokesh.daiya@gmail.com',
    businessImpact:'High',
    status:'open',
    technology:'finance, angular',
    challengeArea:'performance',
    
  }]
  constructor(
    public dialog: MatDialog,
    private postService: PostService,
    private userPostMapService: UserPostMapService,
    private userService: UserService,
    private authService: AuthService

  ) {
    
  }

  
  
  addPost() {
    this.dialog.open(TaskFormComponent, {
      data: new Post(),
      width: '500px'
    });
  }
 
  viewPost(post){
    console.log(post)
  }
 
  getPostedByData(){
    this.show = false;
    this.postService.posts.snapshotChanges().map(changes => {
      return changes.map(c => ({ postId: c.payload.key, ...c.payload.val() }));
    }).subscribe(data => {
      console.log(data);
      this.show = true;
      console.log(this.authService.currentUserName);
      this.posts = data.reverse().filter(post => post.createdBy != this.authService.currentUserName);
      this.filteredPost = this.posts;
    })
  }

  
  filterPost(val: string): any[] {
    if(val){
      if(this.filteredPost.length === 0) {
        this.filteredPost = this.posts;
      }
      return this.filteredPost.filter(post => post.technologies.toLowerCase().includes(val.toLowerCase()))
    }
    return this.posts;
  }

  ngOnInit() {
    
     // get data for posted by me
    this.getPostedByData();

    this.searchControl.valueChanges.
     debounceTime(400)
    .distinctUntilChanged()
    .subscribe(value => {
      this.filteredPost = this.filterPost(value)
    });

   
  }
}




