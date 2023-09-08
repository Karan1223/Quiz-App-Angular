import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private baseUrl = 'http://localhost:8080/question';

  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/allQuestion`);
  }

  getByFilter(category: any, difficultyLevel: any): Observable<any[]>
  {
      return this.http.get<any[]>(`${this.baseUrl}/filter/${category}/${difficultyLevel}`);
  }

  getByCategory(category: any): Observable<any[]>
  {
      return this.http.get<any[]>(`${this.baseUrl}/category/${category}`);
  }

  getByDifficultyLevel(difficultyLevel: any): Observable<any[]>
  {
      return this.http.get<any[]>(`${this.baseUrl}/filter/${difficultyLevel}`);
  }
}
