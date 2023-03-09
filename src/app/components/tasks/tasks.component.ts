import { Component } from '@angular/core';
import { Task } from '../../Task' 
import { TaskService } from '../../services/task.service'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = []; 
  searchTerm$ = new Subject<string>();
 

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // .subscribe = "then"
    this.tasks = this.tasks;
    this.filterList();
    this.taskService
      .getTasks()
      .subscribe(
        (tasks) => (this.tasks = tasks)
      )
  }
 
  filterList(): void {
    
    this.searchTerm$
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(term => {
      this.tasks = this.tasks
        .filter(task => task.text.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter(t => t.id !== task.id))
      )
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe()
  }

  addTask(task: Task) {
    this.taskService
      .addTask(task)
      .subscribe(
        (task) => (this.tasks.push(task))
      )
  }
}
