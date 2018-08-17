import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class UserLoginComponent implements OnInit {
  isLoading = false;
  user: User;
  isNewUser = true;
  email = '';
  password = '';
  name = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };

  resetPassword = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.user = new User();
    console.log('in login page');
  }

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  changeForm() {
    this.clearErrorMessage();
    this.isNewUser = !this.isNewUser;
  }

  onSignUp(): void {
    this.clearErrorMessage();

    if (this.validateForm(this.email, this.password)) {
      this.isLoading = true;
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => {
          this.isLoading = false;
          this.user.email = this.email;
          this.user.name = this.name;
          this.userService.createUser(this.user);
        }).catch(_error => {
          this.isLoading = false;
          this.error = _error;
          this.router.navigate(['/']);
        });
    } else if (this.errorMessage.length > 0) {
      this.isLoading = false;
    }
  }

  onLoginEmail(): void {
    this.isLoading = true;
    this.clearErrorMessage();

    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => {
          this.isLoading = false;
          this.router.navigate(['/home']);
        })
        .catch(_error => {
          this.isLoading = false;
          this.error = _error;
          this.router.navigate(['/']);
        });
    } else if (this.errorMessage.length > 0) {
      this.isLoading = false;
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessage = 'Please enter Email!';
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = 'Please enter Password!';
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters!';
      return false;
    }

    // if(this.name.length < 3) {
    //   this.errorMessage = 'Name should be at least 3 characters!'
    //   return false
    // }

    this.errorMessage = '';

    return true;
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
      return false;
    }

    return true;
  }

  sendResetEmail() {
    this.clearErrorMessage();

    // this.authService.resetPassword(this.email)
    //   .then(() => this.resetPassword = true)
    //   .catch(_error => {
    //     this.error = _error
    //   })
  }
}
