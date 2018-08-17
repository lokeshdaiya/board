import { NgModule} from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';
import { UserProfileContentComponent } from './content/content.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule,
         MatIconModule,
         MatInputModule,
         MatCheckboxModule,
         MatSelectModule,
         MatRadioModule,
         MatButtonModule,
         MatChipsModule
        } from '@angular/material';
import { LoadingModule } from '../loading/loading.module';
@NgModule({
  imports: [ RouterModule,
             ReactiveFormsModule,
             CommonModule,
             MatCardModule,
             MatIconModule,
             MatInputModule,
             MatCheckboxModule,
             MatSelectModule,
             MatRadioModule,
             MatButtonModule,
             MatChipsModule,
             LoadingModule ],
  declarations: [ UserProfileComponent, UserProfileContentComponent ],
  exports: [ UserProfileComponent, UserProfileContentComponent ]
})
export class UserProfileModule {}
