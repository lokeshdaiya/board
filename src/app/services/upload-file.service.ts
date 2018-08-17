import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireList } from 'angularfire2/database';
import { UserService } from './user.service';

@Injectable()
export class UploadFileService {

  private basePath = '/upload';

  posts: AngularFireList<any> = null; //  list of objects
  post: any = null; //   single object
  storageRef;
  isLoading = false;

  constructor(private fireStorage: AngularFireStorage,
              private userService: UserService) {}

   uploadFile(file: any): any {
    this.isLoading = true;
    const id = Math.random().toString(36).substring(2);
    this.storageRef = this.fireStorage.storage.ref(id);
    this.storageRef.put(file).then((snapshot) => {
      this.storageRef.getDownloadURL().then((url) => {
        this.isLoading = false;
        this.userService.currentUser.profilePicture = url;
        this.userService.updateUser(this.userService.currentUser.userId, {profilePicture: url});
      });
    });
   }

}
