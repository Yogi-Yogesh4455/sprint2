import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MallService {
  private apiUrl = 'http://localhost:8080/malls'; // Adjust based on your backend URL

  constructor(private http: HttpClient) {}

  // Get all malls
  getAllMalls(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a mall by ID
  getMallById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Register or update a mall
  saveMall(mall: any): Observable<any> {
    if (mall.id) {
      // If the mall has an ID, perform an update
      return this.http.put<any>(`${this.apiUrl}/${mall.id}`, mall);
    } else {
      // Otherwise, create a new mall
      return this.http.post<any>(this.apiUrl, mall);
    }
  }

  // Delete a mall by ID
  deleteMall(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
