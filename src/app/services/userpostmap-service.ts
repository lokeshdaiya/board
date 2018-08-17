import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class UserPostMapService {

  private basePath: string = '/postuserMap';

  posts: AngularFireList<any> = null; //  list of objects
  post: any = null; //   single object

  constructor(private db: AngularFireDatabase) {
      this.getPostsList();
   }

  getPostsList(): any {
    this.posts = this.db.list(this.basePath, ref => ref.orderByChild('appliedAt'));
    return this.posts;
  }

  getPost(key: string): any {
    const postPath =  `${this.basePath}/${key}`;
    this.post = this.db.object(postPath);
    return this.post;
  }

  createPost(post: any): void  {
   this.posts.push(post)
     .then(error => this.handleError(error));
 }


 // Update an existing post
 updatePost(key: string, value: any): void {
   this.posts.update(key, value)
     .catch(error => this.handleError(error));
 }

 // Deletes a single post
 deletePost(key: string): void {
     this.posts.remove(key)
       .catch(error => this.handleError(error));
 }

 // Deletes the entire list of posts
 deleteAll(): void {
     this.posts.remove()
       .catch(error => this.handleError(error));
 }

 // Default error handling for all actions
 private handleError(error) {
   console.log(error);
 }

}
