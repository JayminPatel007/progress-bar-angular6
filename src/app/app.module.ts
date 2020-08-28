import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileUploadFormComponent } from './file-upload-form/file-upload-form.component';
import { FileUploadProgressbarBoxComponent } from './file-upload-progressbar-box/file-upload-progressbar-box.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { FileDropDirective } from './file-drop.directive';
import {FileUploadFormAboutComponent} from './file-upload-form-about/file-upload-form-about.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadFormComponent,
    FileUploadProgressbarBoxComponent,
    HomeComponent,
    FileDropDirective,
    FileUploadFormAboutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
