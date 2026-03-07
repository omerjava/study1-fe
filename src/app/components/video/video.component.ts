import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Video } from '../../models/video.model';
import { FormsModule } from '@angular/forms';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video',
  imports: [CommonModule, FormsModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {

  private videoService = inject(VideoService);

  videos = signal<Video[]>([]);
  selectedFile: File | undefined;

  selectedFilePreview: string | ArrayBuffer | null = null;
  formError = '';

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.videoService.getVideos().subscribe(v => {
      this.videos.set(v);
    });
  }


  onChangeFile(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.selectedFilePreview = reader.result;
    };

    reader.readAsDataURL(this.selectedFile);
  }

  uploadVideo() {

    if (!this.selectedFile) {
      this.formError = 'Please select a video';
      return;
    }

    this.videoService.uploadVideo(this.selectedFile).subscribe({
      next: () => {
        this.loadVideos();
        this.selectedFile = undefined;
        this.selectedFilePreview = null;
      },
      error: () => {
        this.formError = 'Upload failed';
      }
    });

  }

  downloadVideo(video: Video) {

    if (!video.id) return;

    this.videoService.downloadVideo(video.id).subscribe(blob => {

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = video.fileName || 'video.mp4';
      a.click();

      window.URL.revokeObjectURL(url);

    });
  }

  deleteVideo(video: Video) {

    if (!video.id) return;

    if (!confirm('Delete this video?')) {
      return;
    }

    this.videoService.deleteVideo(video.id).subscribe(() => {
      this.loadVideos();
    });

  }


}
