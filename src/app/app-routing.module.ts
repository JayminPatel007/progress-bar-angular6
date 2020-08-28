import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FileUploadFormComponent} from './file-upload-form/file-upload-form.component';
import {FileUploadFormAboutComponent} from './file-upload-form-about/file-upload-form-about.component';

const appRoutes: Routes = [
  {path: 'add', component: FileUploadFormComponent},
  {path: 'about', component: FileUploadFormAboutComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
