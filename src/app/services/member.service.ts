import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseUrl = 'http://localhost:8080/api/members';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl);
  }

  getById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/${id}`);
  }

  create(member: Member): Observable<Member> {
    return this.http.post<Member>(this.baseUrl, member);
  }

  update(member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.baseUrl}/${member.id}`, member);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
