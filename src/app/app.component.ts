import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'Test';
  selectedPath = '/home';
  constructor(private router: Router, public authService: AuthService, public userService: UserService) {
  }

 ngOnInit() {
   console.log('path is', this.router.url);
  //  if(!this.authService.authState){
  //   this.router.navigate(['/']);
  //  }
 }

  openbasic(path) {
    this.selectedPath = path;
    this.router.navigate([path]);
  }
}
