import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Task {
  id?: string;
  title: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  static url = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient,) {
  }

  getTask(date: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${TasksService.url}?date=${date}`)
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(`${TasksService.url}`, task)
      .pipe(map(res => res));
  }

  remove(id: string) {
    return this.http.delete(`${TasksService.url}/${id}`);
  }
}
