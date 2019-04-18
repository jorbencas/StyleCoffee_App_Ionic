import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    IonicModule,
    CommonModule,
    Camera,
    File,
    WebView,
  ]
})
export class FileUploadModule { }
