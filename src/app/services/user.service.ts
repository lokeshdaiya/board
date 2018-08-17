import {Injectable} from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  currentUser: User;
  private basePath: string = '/users';

  users: AngularFireList<any> = null; //  list of objects
  user: any = null; //   single object

  constructor(private db: AngularFireDatabase, private router: Router) {
      this.getUsersList();
   }

  getUsersList(): any {
    this.users = this.db.list(this.basePath);
    return this.users;
  }


  getUser(key: string): any {
    const userPath =  `${this.basePath}/${key}`;
    this.user = this.db.object(userPath);
    return this.user;
  }

  createUser(user: any): void  {
   this.users.push(user)
     .then(
       success => {
        this.router.navigate(['/home'])
        console.log(success);
       },
       error => this.handleError(error));
 }


 // Update an existing user
 updateUser(key: string, value: any): void {
   this.users.update(key, value).then(() => {
     console.log('Profile update');
   })
     .catch(error => this.handleError(error));
 }

 // Deletes a single user
 deleteUser(key: string): void {
     this.users.remove(key)
       .catch(error => this.handleError(error));
 }

 // Deletes the entire list of users
 deleteAll(): void {
     this.users.remove()
       .catch(error => this.handleError(error));
 }

 // Default error handling for all actions
 private handleError(error) {
   console.log(error);
   alert('Something went wrong');
 }

}
