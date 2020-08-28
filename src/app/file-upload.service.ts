import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  files = [];
  fileWithProgressbar = [];
  apiUrl = 'http://midlal.com:4000/api/upload';
  subject = new Subject<any>();
  uploadingFileCount = 0
  currentIndex = 0;
  uploadedFileCount = 0;
  private sbj = new Subject();

  constructor(private http: HttpClient) {
  }

  upload() {
    let ind = this.currentIndex;
    while ( ind < this.files.length ) {
      const reader = new FileReader();
      reader.readAsDataURL(this.files[ind].file);
      const fileName = this.files[ind].file.name;
      const fileId = this.files[ind].id;
      const filetag = this.files[ind].tag;
      reader.onload = (_event) => {
        const imgUrl = reader.result;
        // console.log('-----------------------------------------', imgUrl);
        this.subject.next({name: fileName, type: -1, progress: 0, imgUrl: imgUrl, tag: filetag, id: fileId});
      };
      ind++;
    }
    this.uploadFile(this.currentIndex);
    this.sbj.subscribe(() => {
      console.log('inside subscribe');
      if (this.currentIndex < this.files.length) {
        // console.log('************************', this.files[this.currentIndex].name);
        this.uploadFile(this.currentIndex);
      }
    });
  }
  uploadFile(index: number) {
    const uploadData = new FormData()
    uploadData.append('name', this.files[index].file.name);
    uploadData.append('avatar', this.files[index].file);
    this.http.post(this.apiUrl, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        // this.subject.next({name: file.name, event: event.type});
        // console.log(event.type);
        if (event.type === 0) {
          this.subject.next({name: this.files[index].file.name, type: event.type, progress: 0, id: this.files[index].id});
          this.uploadingFileCount++;
          this.currentIndex++;
          // console.log(this.files[index].name);
          // console.log('-----------------', this.uploadingFileCount);
          if (this.uploadingFileCount < 3 && this.currentIndex < this.files.length) {
            this.sbj.next();
          }
        } else if (event.type === 1 ) {
          // @ts-ignore
          // tslint:disable-next-line:max-line-length
          this.subject.next({name: this.files[index].file.name, type: event.type, progress: Math.round(100 * event.loaded / event.total), id: this.files[index].id});
        } else  if (event.type === 4) {
          this.subject.next({name: this.files[index].file.name, type: event.type, progress: 100, id: this.files[index].id});
          this.uploadingFileCount--;
          this.uploadedFileCount++;
          if (this.uploadingFileCount < 3 && this.currentIndex < this.files.length ) {
            this.sbj.next();
          }
        }

        // console.log(event);
      });
  }

  reset() {
    this.files = [];
    this.currentIndex = 0;
    this.uploadedFileCount = 0;
    this.uploadingFileCount = 0;
  }
}

