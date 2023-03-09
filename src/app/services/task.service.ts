import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
// import { Observable,of } from 'rxjs'
import { Task } from '../Task' // interface
// import { TASKS } from '../mock-tasks' // mock backend (static file)

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:5000/tasks'

  constructor(private http: HttpClient) { }

  // get from mock file
  //getTasks(): Task[] {
  //  return TASKS;
  //}

  getTasks(): Observable<Task[]> {
    // get from mock file using observable
    //const tasks = of(TASKS);
    //return tasks;

    return this.http.get<Task[]>(this.apiUrl)
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
