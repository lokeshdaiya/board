import {AngularFireAuth} from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
 
@Injectable()
export class AuthService {
 
  authState: any = null;
 
  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }
 
  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }
 
  get currentUserName(): string {
    return this.authState['email']
  }
 
  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }
 
  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  constructor(private afAuth: AngularFireAuth, private router: Router, public userService: UserService) {
    this.afAuth.authState.subscribe((auth) => {
      if(auth){
        this.authState = auth;
        this.userService.users.snapshotChanges().map(changes => {
          return changes.map(c => ({ userId: c.payload.key, ...c.payload.val() }));
        }).subscribe(data => {
          userService.currentUser = data.filter(u => u.email == this.currentUserName)[0];
        })
      }
        
    });
  }
 
  signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }
 
  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }
 
  signOut(): void {
    this.afAuth.auth.signOut();
    this.authState = null;
    this.router.navigate(['/'])
  }
}