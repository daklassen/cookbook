import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  isHovering: boolean;

  @Input()
  fileName: string;

  @Output()
  uploadedFile: EventEmitter<File> = new EventEmitter();

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    this.uploadedFile.emit(file);
  }
}
