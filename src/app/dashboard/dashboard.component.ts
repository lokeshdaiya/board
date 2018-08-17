import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../services/post.service';
import { UserPostMapService } from '../services/userpostmap-service';
import { UserPostMap, Post } from '../models/post.model';
import { AuthService } from '../services/auth.service';
import { element } from 'protractor';
/**
 * @dashboard page
 */
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit  {
  categories: any = [
    {'title': 'Applied', 'id': 1, 'count': 5},
    {'title': 'Posted', 'id': 2, 'count': 10},
    {'title': 'In Progress', 'id': 3, 'count': 3},
    {'title': 'Completed', 'id': 4, 'count': 3},
    
  ];

  /*catergories2: any = [
    {'title': 'Applied', 'id': 1},
    {'title': 'Posted', 'id': 2},
    {'title': 'In Progress', 'id': 3},
    {'title': 'Completed', 'id': 4},
]*/

  categories1: any = [];

  single: any[];
  RatingResult: any[];
  view: any[] = [450, 300];
  animations = true;
  user = 'e1000000';

  colorScheme = {
    domain: ['#5d9cec', '#7266ba', '#ff902b', '#43d967', '#009775']
  } 

  constructor( private postService: PostService, private userPostMapService: UserPostMapService,  private authService: AuthService) {}
  
  ngOnInit() {
    this.single = [
      {
        "name": "Applied",
        "value": 5
      },
      {
        "name": "Posted",
        "value": 10
      },
      {
        "name": "In Progress",
        "value": 3
      },
      {
        "name": "Completed",
        "value": 3
      }
    ];
    this.getPostedByData();
  }

  getPostedByData() {
   /* this.postService.posts.snapshotChanges().map(changes => {
      return changes.map(c => ({ postId: c.payload.key, ...c.payload.val() }));
    }).subscribe(data => {
      console.log("ax",data);
    }) */

    this.postService.posts.snapshotChanges().map(changes => {
      return changes.map(c => ({ postId: c.payload.key, ...c.payload.val() }));
    }).subscribe(data => {
       //console.log (data.filter(post => post.createdBy == this.authService.currentUserName).length);
      // this.catergories2[0]['count'] = data.filter(post => post.createdBy == this.authService.currentUserName).length;
    })

    this.userPostMapService.posts.snapshotChanges().map(changes => {
      return changes.map(c => ({ postId: c.payload.key, ...c.payload.val() }));
    }).subscribe(data => {
      
      //console.log (data.filter(post => post.appliedUserId == this.authService.currentUserName).length);
      //console.log("applied",data);
    })
   
  }


//ngAfterViewInit(){}

}
