import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../models/video.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api/videos';

  uploadVideo(file: File): Observable<Video> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Video>(`${this.api}/upload`, formData);
  }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.api);
  }

  downloadVideo(id: number): Observable<Blob> {
    return this.http.get(`${this.api}/download/${id}`, { responseType: 'blob' }) as Observable<Blob>;
  }

  deleteVideo(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
